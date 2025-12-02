import { organizations } from '@/database/schema/organization.schema'

type Organization = typeof organizations.$inferSelect
type OrganizationPayload = typeof organizations.$inferInsert

export type { Organization, OrganizationPayload }
