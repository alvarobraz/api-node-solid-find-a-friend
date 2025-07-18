import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repositories'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetUseCase(petsRepository)

  return useCase
}
