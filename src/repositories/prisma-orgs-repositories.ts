import { prisma } from '@/lib/prisma'
import { Prisma } from 'generated/prisma'

export class PrismaOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const user = await prisma.org.create({
      data,
    })

    return user
  }
}
