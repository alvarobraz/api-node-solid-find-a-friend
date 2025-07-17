import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeFetchOrgsByStatesAndCityUseCase } from '@/use-cases/factories/make-fetch-orgs-by-state-and-city-use-case'
import { BrazilianState } from '@/utils/states'

export async function searchOrgs(request: FastifyRequest, reply: FastifyReply) {
  const searchOrgsQuerySchema = z.object({
    state: z
      .enum(
        Object.values(BrazilianState) as [
          keyof typeof BrazilianState,
          ...Array<keyof typeof BrazilianState>,
        ],
      )
      .transform((val) => val as BrazilianState),
    city: z.string(),
  })

  const { state, city } = searchOrgsQuerySchema.parse(request.query)

  const fetchOrgsUseCase = makeFetchOrgsByStatesAndCityUseCase()

  const { orgs } = await fetchOrgsUseCase.execute({
    state,
    city,
  })

  return reply.status(200).send({ orgs })
}
