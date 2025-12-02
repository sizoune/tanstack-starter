import { and, eq, inArray } from 'drizzle-orm'
import { sessions } from '@/database/schema/session.schema'
import { updateRecords } from '@/database/utils/database.utils'
import type { SessionPayload } from '@/types/session.type'
import { handleErrorWithArray } from '@/utils/function.utils'

const updateSessions = async (
  userId: string,
  ids: string[],
  sessionPayload: Omit<Partial<SessionPayload>, 'userId' | 'id'>
) => {
  return handleErrorWithArray(() =>
    updateRecords(sessions, sessionPayload, {
      where: and(eq(sessions.userId, userId), inArray(sessions.id, ids))
    })
  )
}

export { updateSessions }
