import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from 'generated/prisma'
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

  async findByName(name: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    })

    return pet
  }

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
