import { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/orgs/authenticate'
import { createOrg } from './create-org'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { orgProfile } from './org-profile'
import { refresh } from './refresh'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, orgProfile)
}
