import { and, eq, inArray, not } from 'drizzle-orm'
import { accounts } from '@/database/schema/account.schema'
import { users } from '@/database/schema/user.schema'
import {
  deleteRecords,
  queryMultipleRecords,
  querySingleRecord,
  querySingleRecordWithJoin,
  updateRecords
} from '@/lib/database/utils/database.utils'
import type { AccountPayload } from '@/types/account.type'
import { firstElement } from '@/utils/array.utils'
import { handleErrorWithArray, handleErrorWithNull } from '@/utils/function.utils'

const readAccounts = async (accountId: string) => {
  return handleErrorWithArray(() =>
    queryMultipleRecords(
      accounts,
      {
        id: accounts.id,
        name: accounts.name,
        image: accounts.image,
        userId: accounts.userId,
        description: accounts.description
      },
      {
        where: not(eq(accounts.id, accountId))
      }
    )
  )
}

const readAccountsByUserId = async (userId: string) => {
  return handleErrorWithArray(() =>
    queryMultipleRecords(
      accounts,
      {
        id: accounts.id,
        userId: accounts.userId
      },
      {
        where: eq(accounts.userId, userId)
      }
    )
  )
}

const readAccount = async (accountId: string) => {
  return handleErrorWithNull(() =>
    querySingleRecord(
      accounts,
      {
        id: accounts.id,
        name: accounts.name,
        image: accounts.image,
        description: accounts.description
      },
      {
        where: eq(accounts.id, accountId)
      }
    ).then(firstElement)
  )
}

const readAccountByUserIdAndProviderId = async (userId: string, providerId: string) => {
  return handleErrorWithNull(() =>
    querySingleRecordWithJoin(
      accounts,
      {
        id: accounts.id,
        userName: users.name,
        userImage: users.image,
        userDescription: users.description
      },
      {
        where: and(eq(accounts.userId, userId), eq(accounts.providerId, providerId)),
        join: {
          joinTable: users,
          joinType: 'innerJoin',
          joinQuery: eq(accounts.userId, users.id)
        }
      }
    ).then(firstElement)
  )
}

const updateAccounts = async (
  userId: string,
  ids: string[],
  accountPayload: Omit<Partial<AccountPayload>, 'userId' | 'id'>
) => {
  return handleErrorWithArray(() =>
    updateRecords(accounts, accountPayload, {
      where: and(eq(accounts.userId, userId), inArray(accounts.id, ids))
    })
  )
}

const destroyAccounts = async (ids: string[]) => {
  return handleErrorWithArray(() => deleteRecords(accounts, { where: inArray(accounts.id, ids) }))
}

export {
  destroyAccounts,
  readAccount,
  readAccountByUserIdAndProviderId,
  readAccounts,
  readAccountsByUserId,
  updateAccounts
}
