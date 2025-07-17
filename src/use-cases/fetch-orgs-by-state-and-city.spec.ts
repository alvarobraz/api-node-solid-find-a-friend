import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchOrgsByStateAndCityUseCase } from './fetch-orgs-by-state-and-city'
import { BrazilianState } from '@/utils/states'
import { Prisma } from 'generated/prisma'

let orgsRepository: InMemoryOrgsRepository
let sut: FetchOrgsByStateAndCityUseCase

describe('Fetch Orgs By State And City Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchOrgsByStateAndCityUseCase(orgsRepository)
  })

  it('should fetch orgs by state and city', async () => {
    await orgsRepository.create({
      name: 'Org One',
      email: 'org1@example.com',
      password_hash: 'hashed-password',
      whatsapp: '419123456789',
      street: 'Rua Teste',
      city: 'Curitiba',
      state: BrazilianState.PR,
      postal_code: '81010360',
      latitude: new Prisma.Decimal(-25.4795628),
      longitude: new Prisma.Decimal(-49.2862921),
    })

    await orgsRepository.create({
      name: 'Org Two',
      email: 'org2@example.com',
      password_hash: 'hashed-password',
      whatsapp: '419987654321',
      street: 'Rua Teste 2',
      city: 'Curitiba',
      state: BrazilianState.PR,
      postal_code: '81010361',
      latitude: new Prisma.Decimal(-25.4795628),
      longitude: new Prisma.Decimal(-49.2862921),
    })

    const { orgs } = await sut.execute({
      state: BrazilianState.PR,
      city: 'Curitiba',
    })

    expect(orgs).toHaveLength(2)
    expect(orgs).toEqual([
      expect.objectContaining({
        name: 'Org One',
        city: 'Curitiba',
        state: BrazilianState.PR,
      }),
      expect.objectContaining({
        name: 'Org Two',
        city: 'Curitiba',
        state: BrazilianState.PR,
      }),
    ])
  })

  it('should fetch orgs by state and city case-insensitive', async () => {
    await orgsRepository.create({
      name: 'Org One',
      email: 'org1@example.com',
      password_hash: 'hashed-password',
      whatsapp: '419123456789',
      street: 'Rua Teste',
      city: 'Curitiba',
      state: BrazilianState.PR,
      postal_code: '81010360',
      latitude: new Prisma.Decimal(-25.4795628),
      longitude: new Prisma.Decimal(-49.2862921),
    })

    const { orgs } = await sut.execute({
      state: BrazilianState.PR,
      city: 'cUriTibA',
    })

    expect(orgs).toHaveLength(1)
    expect(orgs).toEqual([
      expect.objectContaining({
        name: 'Org One',
        city: 'Curitiba',
        state: BrazilianState.PR,
      }),
    ])
  })

  it('should return empty array if no orgs are found', async () => {
    const { orgs } = await sut.execute({
      state: BrazilianState.SP,
      city: 'São Paulo',
    })

    expect(orgs).toHaveLength(0)
  })
})
