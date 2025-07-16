import { Prisma, Pet } from 'generated/prisma'

export interface PetsRepository {
  // findById(id: string): Promise<Org | null>
  findByName(name: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  // save(org: Org): Promise<Org>
}
