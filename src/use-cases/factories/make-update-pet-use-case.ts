import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repositories'
import { AdoptPetUseCase } from '../adot-pet'

export function makeAdoptPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const adoptPetUseCase = new AdoptPetUseCase(petsRepository)

  return adoptPetUseCase
}
