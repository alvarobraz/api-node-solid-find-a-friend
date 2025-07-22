import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Org } from 'generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  description?: string | null
  age?: string | null
  size?: string | null
  energy_level?: string | null
  independence?: string | null
  environment?: string | null
  org_id: string
  requirements?: string[]
  adopted_at?: Date | string | null
}

interface CreatePetUseCaseResponse {
  pet: Pet & { org?: Org; requirements?: { description: string }[] }
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energy_level,
    independence,
    environment,
    org_id,
    adopted_at,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const orgExists = await this.petsRepository.findOrgById(org_id)
    if (!orgExists) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level,
      independence,
      environment,
      org_id,
      requirements: requirements
        ? {
            create: requirements.map((description) => ({ description })),
          }
        : undefined,
      adopted_at,
    })

    const org = await this.petsRepository.findOrgById(org_id)

    return {
      pet: {
        ...pet,
        org: org ?? undefined,
      },
    }
  }
}
