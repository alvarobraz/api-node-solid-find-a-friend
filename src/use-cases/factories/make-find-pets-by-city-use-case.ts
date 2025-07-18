import { FindPetsByCityUseCase } from '@/use-cases/find-pets-by-city'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repositories'

export function makeFindPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindPetsByCityUseCase(petsRepository)

  return useCase
}
