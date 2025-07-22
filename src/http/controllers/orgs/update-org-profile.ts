import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeUpdateOrgUseCase } from '@/use-cases/factories/make-update-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { Prisma } from 'generated/prisma'
import { BrazilianState } from '@/utils/states'

export async function UpdateOrg(request: FastifyRequest, reply: FastifyReply) {
  const updateOrgBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    whatsapp: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z
      .enum(
        Object.values(BrazilianState) as [
          keyof typeof BrazilianState,
          ...Array<keyof typeof BrazilianState>,
        ],
      )
      .transform((val) => val as BrazilianState)
      .optional(),
    postal_code: z.string().optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
  })

  const updateOrgParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const parsedData = updateOrgBodySchema.parse(request.body)
  const { orgId } = updateOrgParamsSchema.parse(request.params)

  const { latitude, longitude, ...rest } = parsedData

  const data = {
    ...rest,
    ...(latitude !== undefined
      ? { latitude: new Prisma.Decimal(latitude) }
      : {}),
    ...(longitude !== undefined
      ? { longitude: new Prisma.Decimal(longitude) }
      : {}),
  }

  try {
    const updateOrgUseCase = makeUpdateOrgUseCase()

    await updateOrgUseCase.execute({
      orgId,
      updates: data,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
