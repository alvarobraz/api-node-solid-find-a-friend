import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repositories'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const orgsRepository = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(orgsRepository)

  return createPetUseCase
}
