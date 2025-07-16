import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { createPet } from './create-pet'

export async function petRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    createPet,
  )
}
