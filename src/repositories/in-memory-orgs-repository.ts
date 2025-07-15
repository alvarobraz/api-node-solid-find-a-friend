import { Prisma } from 'generated/prisma'

export class InMemoryOrgsRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public orgs: any = []

  async create(data: Prisma.OrgCreateInput) {
    this.orgs.push(data)
  }
}
