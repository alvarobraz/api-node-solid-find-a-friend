/* eslint-disable camelcase */
import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/orgs', async (request, reply) => {
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

  await prisma.org.create({
    data: {
      name,
      email,
      password_hash: password,
      whatsapp,
      street,
      city,
      state,
      postal_code,
      latitude,
      longitude,
    },
  })

  return reply.status(201).send()
})
