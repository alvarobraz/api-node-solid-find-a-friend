import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { CreateOrgUseCase } from '@/use-cases/create-org'
// import { InMemoryOrgsRepository } from '@/repositories/in-memory-orgs-repository'

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
    latitude: z.string(),
    longitude: z.string(),
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
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
