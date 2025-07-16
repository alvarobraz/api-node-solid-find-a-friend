import { PetsRepository } from '@/repositories/pets-repository'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'
import { Pet } from 'generated/prisma'

interface CreatePetUseCaseRequest {
  name: string
  description: string | null
  age: string | null
  size: string | null
  energy_level: string | null
  independence: string | null
  environment: string | null
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
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
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const normalizedName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

    const petWithSameName = await this.petsRepository.findByName(normalizedName)

    if (petWithSameName) {
      throw new PetAlreadyExistsError()
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
    })

    return {
      pet,
    }
  }
}
