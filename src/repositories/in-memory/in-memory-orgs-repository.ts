import { Prisma, Org, Role } from 'generated/prisma'
import { OrgsRepository } from '../orgs-repository'
import { BrazilianState } from '@/utils/states'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'org-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: (data.role ?? 'MEMBER') as Role,
      whatsapp: data.whatsapp,
      street: data.street,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async save(org: Org) {
    const orgIndex = this.items.findIndex((item) => item.id === org.id)

    if (orgIndex >= 0) {
      this.items[orgIndex] = org
    }

    return org
  }

  async fetchByStateAndCity(
    state: BrazilianState,
    city: string,
  ): Promise<Org[]> {
    return this.items.filter(
      (item) =>
        item.state === state && item.city.toLowerCase() === city.toLowerCase(),
    )
  }
}
