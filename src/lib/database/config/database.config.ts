import { createServerOnlyFn } from '@tanstack/react-start'
import { config as dotEnvConfig } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'

import { accounts } from '@/database/schema/account.schema'
import { members } from '@/database/schema/member.schema'
import { organizations } from '@/database/schema/organization.schema'
import { sessions } from '@/database/schema/session.schema'
import { users } from '@/database/schema/user.schema'
import { verifications } from '@/database/schema/verification.schema'

dotEnvConfig({ quiet: true })

const database = createServerOnlyFn(() =>
  drizzle(process.env.DATABASE_URL as string, {
    schema: { accounts, sessions, users, verifications, organizations, members }
  })
)()

export { database }
