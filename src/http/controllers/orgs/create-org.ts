import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
// import { InMemoryOrgsRepository } from '@/repositories/in-memory-orgs-repository'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { BrazilianState } from '@/utils/states'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    street: z.string(),
    city: z.string(),
    state: z
      .enum(
        Object.values(BrazilianState) as [
          keyof typeof BrazilianState,
          ...Array<keyof typeof BrazilianState>,
        ],
      )
      .transform((val) => val as BrazilianState),
    postal_code: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const {
    name,
    email,
    password,
    whatsapp,
    street,
    city,
    state,
    postal_code,
    latitude,
    longitude,
  } = registerBodySchema.parse(request.body)

  try {
    const createOrgrUseCase = makeCreateOrgUseCase()

    await createOrgrUseCase.execute({
      name,
      email,
      password,
      whatsapp,
      street,
      city,
      state,
      postal_code,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
