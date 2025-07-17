import { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/orgs/authenticate'
import { createOrg } from '@/http/controllers/orgs/create-org'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { orgProfile } from '@/http/controllers/orgs/org-profile'
import { refresh } from '@/http/controllers/orgs/refresh'
import { UpdateOrg } from '@/http/controllers/orgs/update-org-profile'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { searchOrgs } from '@/http/controllers/orgs/search-orgs'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/my-org', { onRequest: [verifyJwt] }, orgProfile)

  app.get('/orgs', searchOrgs)

  app.put(
    '/profile/:orgId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    UpdateOrg,
  )
}
