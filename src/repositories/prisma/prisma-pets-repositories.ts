import { prisma } from '@/lib/prisma'
import { Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  // async findById(id: string): Promise<Org | null> {
  //   const org = await prisma.org.findUnique({
  //     where: {
  //       id,
  //     },
  //   })

  //   return org
  // }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  // async save(data: Org) {
  //   const profileOrg = await prisma.org.update({
  //     where: {
  //       id: data.id,
  //     },
  //     data,
  //   })

  //   return profileOrg
  // }
}
