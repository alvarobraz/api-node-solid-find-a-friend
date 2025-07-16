import { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/authenticate'
import { createOrg } from './controllers/create-org'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { orgProfile } from './controllers/org-profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)

  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJwt] }, orgProfile)
}
