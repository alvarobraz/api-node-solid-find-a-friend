import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { PetAlreadyExistsError } from '@/use-cases/errors/pet-already-exists-error'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const petBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    age: z.string().nullable(),
    size: z.string().nullable(),
    energy_level: z.string().nullable(),
    independence: z.string().nullable(),
    environment: z.string().nullable(),
  })

  const {
    name,
    description,
    age,
    size,
    energy_level,
    independence,
    environment,
  } = petBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      description,
      age,
      size,
      energy_level,
      independence,
      environment,
      org_id: request.user.sub,
    })
  } catch (err) {
    if (err instanceof PetAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
