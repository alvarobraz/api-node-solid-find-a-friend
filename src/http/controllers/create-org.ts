import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { CreateOrgUseCase } from '@/use-cases/create-org'
// import { InMemoryOrgsRepository } from '@/repositories/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
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
    // InMemoryOrgsRepository
    // const orgsRepository = new InMemoryOrgsRepository()
    const orgsRepository = new PrismaOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    await createOrgUseCase.execute({
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
