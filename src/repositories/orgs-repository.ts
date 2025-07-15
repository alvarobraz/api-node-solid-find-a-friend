import { Prisma, Org } from 'generated/prisma'

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
