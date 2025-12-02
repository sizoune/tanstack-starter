import { eq, inArray, SQL } from 'drizzle-orm'
import { accounts } from '@/database/schema/account.schema'
import { users } from '@/database/schema/user.schema'
import {
  deleteRecords,
  insertRecords,
  queryMultipleRecords,
  querySingleRecordWithJoin,
  updateRecords
} from '@/database/utils/database.utils'
import type { UserPayload } from '@/types/user.type'
import { firstElement } from '@/utils/array.utils'
import { handleErrorWithArray, handleErrorWithNull } from '@/utils/function.utils'

const readUsers = async (where?: SQL<unknown>) => {
  return handleErrorWithArray(() =>
    queryMultipleRecords(
      users,
      {
        id: users.id,
        name: users.name,
        image: users.image,
        description: users.description,
        email: users.email,
        emailVerified: users.emailVerified,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      },
      {
        where
      }
    )
  )
}

const readUser = async (userId: string, accountId: string) => {
  return handleErrorWithNull(() =>
    querySingleRecordWithJoin(
      users,
      {
        id: users.id,
        name: users.name,
        image: users.image,
        email: users.email,
        description: users.description,
        providerId: accounts.providerId,
        emailVerified: users.emailVerified
      },
      {
        where: eq(users.id, userId),
        join: {
          joinTable: accounts,
          joinType: 'innerJoin',
          joinQuery: eq(accounts.id, accountId)
        }
      }
    ).then(firstElement)
  )
}

const createUsers = async (userPayloads: Omit<UserPayload, 'id'>[]) => {
  return handleErrorWithArray(() => insertRecords(users, userPayloads))
}

const updateUsers = async (ids: string[], userPayload: Omit<Partial<UserPayload>, 'id'>) => {
  return handleErrorWithArray(() => updateRecords(users, userPayload, { where: inArray(users.id, ids) }))
}

const destroyUsers = async (ids: string[]) => {
  return handleErrorWithArray(() => deleteRecords(users, { where: inArray(users.id, ids) }))
}

export { createUsers, destroyUsers, readUser, readUsers, updateUsers }
