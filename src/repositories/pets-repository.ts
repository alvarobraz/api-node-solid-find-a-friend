import { BrazilianState } from '@/utils/states'
import { Prisma, Pet, Org } from 'generated/prisma'

export interface PetsRepository {
  findById(id: string): Promise<(Pet & { org?: Org }) | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCityAndProperties(
    city: string,
    state?: BrazilianState,
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
  findOrgById(org_id: string): Promise<Org | null>
}
