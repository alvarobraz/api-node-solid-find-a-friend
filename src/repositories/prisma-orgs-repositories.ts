import { prisma } from '@/lib/prisma'
import { Prisma } from 'generated/prisma'

export class PrismaOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
