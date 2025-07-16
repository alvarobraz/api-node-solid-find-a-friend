import { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/authenticate'
import { createOrg } from './controllers/create-org'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)

  app.post('/sessions', authenticate)
}
