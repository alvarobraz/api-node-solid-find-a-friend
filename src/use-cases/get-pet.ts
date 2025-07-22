import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Pet, Org } from 'generated/prisma'

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  pet: Pet & { org?: Org; requirements?: { description: string }[] }
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet || pet.adopted_at !== null) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
