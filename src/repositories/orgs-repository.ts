import { BrazilianState } from '@/utils/states'
import { Prisma, Org } from 'generated/prisma'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
  save(org: Org): Promise<Org>
  fetchByStateAndCity(state: BrazilianState, city: string): Promise<Org[]>
}
