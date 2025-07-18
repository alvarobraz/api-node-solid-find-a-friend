import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeFindPetsByCityUseCase } from '@/use-cases/factories/make-find-pets-by-city-use-case'
import { BrazilianState } from '@/utils/states'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.nativeEnum(BrazilianState, {
      message: 'Invalid state. Must be PR or SP',
    }),
    name: z.string().optional(),
    description: z.string().optional(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    independence: z.string().optional(),
    environment: z.string().optional(),
  })

  const {
    city,
    state,
    name,
    description,
    age,
    size,
    energy_level,
    independence,
    environment,
  } = searchPetsQuerySchema.parse(request.query)

  const findPetsUseCase = makeFindPetsByCityUseCase()

  const { pets } = await findPetsUseCase.execute({
    city,
    state,
    filters: {
      name,
      description,
      age,
      size,
      energy_level,
      independence,
      environment,
    },
  })

  return reply.status(200).send({ pets })
}
