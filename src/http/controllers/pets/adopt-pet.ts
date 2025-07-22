import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAdoptPetUseCase } from '@/use-cases/factories/make-update-pet-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function adoptPet(request: FastifyRequest, reply: FastifyReply) {
  const AdoptPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = AdoptPetParamsSchema.parse(request.params)
    const adopted_at = new Date()

    const adoptPetPetUseCase = makeAdoptPetUseCase()

    const { pet } = await adoptPetPetUseCase.execute({
      id,
      adopted_at,
    })

    return reply.status(200).send(pet)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Invalid input data', errors: err.format() })
    }
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Pet not found' })
    }
    throw err
  }
}
