import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { UpdateOrgUseCase } from '../update-org-profile'

export function makeUpdateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const updateOrgUseCase = new UpdateOrgUseCase(orgsRepository)

  return updateOrgUseCase
}
