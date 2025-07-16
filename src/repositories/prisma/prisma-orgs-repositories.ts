import { prisma } from '@/lib/prisma'
import { Org, Prisma } from 'generated/prisma'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async save(data: Org) {
    const profileOrg = await prisma.org.update({
      where: {
        id: data.id,
      },
      data,
    })

    return profileOrg
  }
}
