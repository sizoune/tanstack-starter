import { eq, SQL } from 'drizzle-orm'
import { organizations } from '@/database/schema/organization.schema'
import { queryMultipleRecords, querySingleRecord } from '@/database/utils/database.utils'
import { firstElement } from '@/utils/array.utils'
import { handleErrorWithArray, handleErrorWithNull } from '@/utils/function.utils'

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

const readOrganizationBySlug = async (slug: string) => {
  return handleErrorWithNull(() =>
    querySingleRecord(
      organizations,
      {
        id: organizations.id,
        name: organizations.name,
        slug: organizations.slug,
        logo: organizations.logo,
        metadata: organizations.metadata
      },
      {
        where: eq(organizations.slug, slug)
      }
    ).then(firstElement)
  )
}

export { readOrganizationBySlug, readOrganizations }
