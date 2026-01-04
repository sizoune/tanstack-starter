import { createServerFn } from '@tanstack/react-start'
import {
  deleteAccountController,
  getAccountController,
  getAccountsController,
  updateAccountController
} from '@/controllers/accounts.controller'
import { authMiddleware } from '@/middleware/auth.middleware'

const getAccounts = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return getAccountsController(context.user.accountId)
  })

const getAccount = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return getAccountController(context.user.accountId)
  })

const updateAccount = createServerFn({
  method: 'POST'
})
  .middleware([authMiddleware])
  .inputValidator((data: { activeOrganizationId: string }) => {
    return data
  })
  .handler(async ({ context, data }) => {
    return updateAccountController(context.user.accountId, context.user.id, {
      activeOrganizationId: data.activeOrganizationId
    })
  })

const deleteAccount = createServerFn({
  method: 'POST'
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return deleteAccountController(context.user.accountId, context.user.id)
  })

export { deleteAccount, getAccount, getAccounts, updateAccount }
