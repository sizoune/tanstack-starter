import { createServerFn } from '@tanstack/react-start'
import { readOrganizations } from '@/database/providers/organizations.provider'
import { authMiddleware } from '@/middleware/auth.middleware'

const getOrganizations = createServerFn({
  method: 'GET'
})
  .middleware([authMiddleware])
  .handler(async () => {
    return readOrganizations()
  })

export { getOrganizations }
