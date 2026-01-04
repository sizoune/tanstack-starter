import { eq, inArray } from 'drizzle-orm'
import { accounts } from '@/database/schema/account.schema'
import { users } from '@/database/schema/user.schema'
import { deleteRecords, querySingleRecordWithJoin } from '@/database/utils/database.utils'
import { firstElement } from '@/utils/array.utils'
import { handleErrorWithArray, handleErrorWithNull } from '@/utils/function.utils'

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

const destroyUsers = async (ids: string[]) => {
  return handleErrorWithArray(() => deleteRecords(users, { where: inArray(users.id, ids) }))
}

export { destroyUsers, readUser }
