import { BrazilianState } from '@/utils/states'
import { Prisma, Pet, Org } from 'generated/prisma'

export interface PetsRepository {
  findById(
    id: string,
  ): Promise<
    (Pet & { org?: Org; requirements?: { description: string }[] }) | null
  >
  create(
    data: Prisma.PetUncheckedCreateInput & {
      requirements?: { create: { description: string }[] }
    },
  ): Promise<Pet & { requirements?: { description: string }[] }>
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
  ): Promise<(Pet & { requirements?: { description: string }[] })[]>
  findOrgById(org_id: string): Promise<Org | null>
  save(data: Pet): Promise<Pet & { requirements?: { description: string }[] }>
}
