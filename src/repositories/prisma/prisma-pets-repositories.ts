import { prisma } from '@/lib/prisma'
import { Org, Pet, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { BrazilianState } from '@/utils/states'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: true,
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

  async findByCityAndProperties(
    city: string,
    state?: BrazilianState,
    filters: Partial<{
      name: string
      description: string
      age: string
      size: string
      energy_level: string
      independence: string
      environment: string
    }> = {},
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        adopted_at: null,
        org: {
          city: {
            contains: city,
            mode: 'insensitive',
          },
          ...(state && { state }),
        },
        name: filters.name
          ? { contains: filters.name, mode: 'insensitive' }
          : undefined,
        description: filters.description
          ? { contains: filters.description, mode: 'insensitive' }
          : undefined,
        age: filters.age
          ? { contains: filters.age, mode: 'insensitive' }
          : undefined,
        size: filters.size
          ? { contains: filters.size, mode: 'insensitive' }
          : undefined,
        energy_level: filters.energy_level
          ? { contains: filters.energy_level, mode: 'insensitive' }
          : undefined,
        independence: filters.independence
          ? { contains: filters.independence, mode: 'insensitive' }
          : undefined,
        environment: filters.environment
          ? { contains: filters.environment, mode: 'insensitive' }
          : undefined,
      },
      include: {
        org: true,
        images: true,
        requirements: true,
      },
    })

    return pets
  }

  async findOrgById(org_id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id: org_id,
      },
    })

    return org
  }
}
