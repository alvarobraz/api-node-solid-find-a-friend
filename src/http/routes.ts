import { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/create-org'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
}
