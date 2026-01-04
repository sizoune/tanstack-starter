import { SQL } from 'drizzle-orm'
import { organizations } from '@/database/schema/organization.schema'
import { queryMultipleRecords } from '@/database/utils/database.utils'
import { handleErrorWithArray } from '@/utils/function.utils'

const readOrganizations = async (where?: SQL<unknown>) => {
  return handleErrorWithArray(() =>
    queryMultipleRecords(
      organizations,
      {
        id: organizations.id,
        name: organizations.name,
        slug: organizations.slug,
        logo: organizations.logo,
        metadata: organizations.metadata
      },
      {
        where
      }
    )
  )
}

export { readOrganizations }
