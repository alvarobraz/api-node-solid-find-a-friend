import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { GetOrgProfileUseCase } from '../get-org-profile'

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetOrgProfileUseCase(orgsRepository)

  return useCase
}
