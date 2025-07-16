import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Org } from 'generated/prisma'

interface UpdateOrgUseCaseRequest {
  orgId: string
  updates: Partial<Omit<Org, 'id' | 'created_at' | 'role'>>
}

interface UpdateOrgUseCaseResponse {
  org: Org
}

export class UpdateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
    updates,
  }: UpdateOrgUseCaseRequest): Promise<UpdateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const updatedOrg: Org = {
      ...org,
      ...updates,
    }

    await this.orgsRepository.save(updatedOrg)

    return {
      org: updatedOrg,
    }
  }
}
