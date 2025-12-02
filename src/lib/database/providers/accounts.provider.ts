import { and, eq, inArray, not } from 'drizzle-orm'
import { accounts } from '@/database/schema/account.schema'
import { organizations } from '@/database/schema/organization.schema'
import { users } from '@/database/schema/user.schema'
import {
  deleteRecords,
  queryMultipleRecords,
  querySingleRecordWithJoin,
  updateRecords
} from '@/database/utils/database.utils'
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
    querySingleRecordWithJoin(
      accounts,
      {
        id: accounts.id,
        name: accounts.name,
        image: accounts.image,
        description: accounts.description,
        organization: {
          id: organizations.id,
          name: organizations.name,
          slug: organizations.slug,
          logo: organizations.logo
        }
      },
      {
        where: eq(accounts.id, accountId),
        join: {
          joinTable: organizations,
          joinType: 'leftJoin',
          joinQuery: eq(accounts.activeOrganizationId, organizations.id)
        }
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
        userDescription: users.description,
        activeOrganizationId: accounts.activeOrganizationId
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
