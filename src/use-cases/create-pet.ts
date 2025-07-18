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
  images?:
    | {
        connect: { id?: string; url?: string } | { id?: string; url?: string }[]
      }
    | undefined
  requirements?:
    | {
        connect:
          | { id?: string; description?: string }
          | { id?: string; description?: string }[]
      }
    | undefined
  adopted_at?: Date | string | null
}

interface CreatePetUseCaseResponse {
  pet: Pet & { org?: Org }
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
      adopted_at,
    })

    return {
      pet,
    }
  }
}
