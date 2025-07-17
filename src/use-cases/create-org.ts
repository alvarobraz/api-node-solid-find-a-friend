import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org, Prisma } from 'generated/prisma'
import { BrazilianState } from '@/utils/states'
import { InvalidStateError } from './errors/invalid-state-errors'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  street: string
  city: string
  state: BrazilianState
  postal_code: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp,
    street,
    city,
    state,
    postal_code,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    if (!Object.values(BrazilianState).includes(state)) {
      throw new InvalidStateError()
    }

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      whatsapp,
      street,
      city,
      state,
      postal_code,
      latitude: new Prisma.Decimal(latitude),
      longitude: new Prisma.Decimal(longitude),
    })

    return {
      org,
    }
  }
}
