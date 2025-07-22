import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { createPet } from './create-pet'
import { searchPets } from './search-pets'
import { getPetById } from './get-pet'
import { adoptPet } from './adopt-pet'

export async function petRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    createPet,
  )

  app.get('/pets', searchPets)
  app.get('/pets/:id', getPetById)

  app.patch('/pets/:id', adoptPet)
}
