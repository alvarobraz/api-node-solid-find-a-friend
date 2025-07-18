import { BrazilianState } from '@/utils/states'
import { Prisma, Pet } from 'generated/prisma'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCityAndProperties(
    city: string,
    state: BrazilianState,
    filters?: Partial<{
      name: string
      description: string
      age: string
      size: string
      energy_level: string
      independence: string
      environment: string
    }>,
  ): Promise<Pet[]>
}
