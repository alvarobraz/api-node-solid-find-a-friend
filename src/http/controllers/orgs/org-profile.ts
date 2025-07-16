import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-profile-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function orgProfile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileUseCase()

  console.log(request.user.sub)
  const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
