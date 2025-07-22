import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Org, Pet } from 'generated/prisma'

interface AdoptPetRequest {
  id: string
  adopted_at?: Date | null
}

interface AdoptPetResponse {
  pet: Pet & { org?: Org; requirements?: { description: string }[] }
}

export class AdoptPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    adopted_at,
  }: AdoptPetRequest): Promise<AdoptPetResponse> {
    const pet = await this.petsRepository.findById(id)
    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const adoptPet = await this.petsRepository.save({
      ...pet,
      adopted_at: adopted_at ?? pet.adopted_at,
    })

    return { pet: adoptPet }
  }
}
