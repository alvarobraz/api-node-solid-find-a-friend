import { PetsRepository } from '@/repositories/pets-repository'
import { BrazilianState } from '@/utils/states'
import { Org, Pet } from 'generated/prisma'

interface FindPetsByCityRequest {
  city: string
  state?: BrazilianState
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

type FindPetsByCityResponse = (Pet & {
  org?: Org
  requirements?: { description: string }[]
})[]

export class FindPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    state,
    filters,
  }: FindPetsByCityRequest): Promise<FindPetsByCityResponse> {
    return this.petsRepository.findByCityAndProperties(city, state, filters)
  }
}
