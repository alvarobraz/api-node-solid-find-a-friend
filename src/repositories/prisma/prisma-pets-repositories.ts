import { Prisma } from 'generated/prisma'
import { BrazilianState } from '@/utils/states'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    return prisma.pet.findUnique({
      where: { id },
      include: { org: true, requirements: true },
    })
  }

  async create(
    data: Prisma.PetUncheckedCreateInput & {
      requirements?: { create: { description: string }[] }
    },
  ) {
    return prisma.pet.create({
      data: {
        ...data,
        requirements: data.requirements
          ? {
              create: data.requirements.create.map((req) => ({
                description: req.description,
                created_at: new Date(),
              })),
            }
          : undefined,
      },
      include: { requirements: true },
    })
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
  ) {
    return prisma.pet.findMany({
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
  }

  async findOrgById(org_id: string) {
    return prisma.org.findUnique({ where: { id: org_id } })
  }
}
