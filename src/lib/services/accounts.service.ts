import { createServerFn } from '@tanstack/react-start'
import {
  destroyAccounts,
  readAccount,
  readAccounts,
  readAccountsByUserId,
  updateAccounts
} from '@/database/providers/accounts.provider'
import { destroyUsers } from '@/database/providers/users.provider'
import { authMiddleware } from '@/middleware/auth.middleware'

const getAccounts = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return readAccounts(context.user.accountId)
  })

const getAccount = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return readAccount(context.user.accountId)
  })

const updateAccount = createServerFn({
  method: 'POST'
})
  .middleware([authMiddleware])
  .inputValidator((data: { activeOrganizationId: string }) => data)
  .handler(async ({ context, data }) => {
    return updateAccounts(context.user.id, [context.user.accountId], {
      activeOrganizationId: data.activeOrganizationId
    })
  })

const deleteAccount = createServerFn({
  method: 'POST'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const accounts = await readAccountsByUserId(context.user.id)

    return accounts.length <= 1 ? destroyUsers([context.user.id]) : destroyAccounts([context.user.accountId])
  })

export { deleteAccount, getAccount, getAccounts, updateAccount }
