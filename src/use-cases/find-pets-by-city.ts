import { PetsRepository } from '@/repositories/pets-repository'
import { BrazilianState } from '@/utils/states'
import { Pet } from 'generated/prisma'

interface FindPetsByCityRequest {
  city: string
  state: BrazilianState
  filters?: Partial<{
    name: string
    description: string
    age: string
    size: string
    energy_level: string
    independence: string
    environment: string
  }>
}

interface FindPetsByCityResponse {
  pets: Pet[]
}

export class FindPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    state,
    filters,
  }: FindPetsByCityRequest): Promise<FindPetsByCityResponse> {
    const pets = await this.petsRepository.findByCityAndProperties(
      city,
      state,
      filters,
    )

    return {
      pets,
    }
  }
}
