import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'

export async function getPetById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  // Definir o schema para validar o parâmetro id
  const getPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    // Validar o parâmetro id
    const { id } = getPetParamsSchema.parse(request.params)

    // Instanciar o caso de uso usando a fábrica
    const getPetByIdUseCase = makeGetPetByIdUseCase()

    // Executar o caso de uso
    const { pet } = await getPetByIdUseCase.execute({ id })

    // Retornar o pet com status 200
    return reply.status(200).send({
      pet: {
        id: pet.id,
        name: pet.name,
        description: pet.description,
        age: pet.age,
        size: pet.size,
        energy_level: pet.energy_level,
        independence: pet.independence,
        environment: pet.environment,
        created_at: pet.created_at,
        adopted_at: pet.adopted_at,
        org_id: pet.org_id,
        org: pet.org
          ? {
              id: pet.org.id,
              name: pet.org.name,
              city: pet.org.city,
              state: pet.org.state,
            }
          : undefined,
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Invalid pet ID format', errors: err.format() })
    }

    if (err instanceof ResourceNotFoundError) {
      return reply
        .status(404)
        .send({ message: 'Pet not found or already adopted' })
    }

    // Propagar erros inesperados
    throw err
  }
}
