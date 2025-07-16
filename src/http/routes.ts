import { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/authenticate'
import { createOrg } from './controllers/create-org'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { orgProfile } from './controllers/org-profile'
import { refresh } from './controllers/refresh'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, orgProfile)
}
