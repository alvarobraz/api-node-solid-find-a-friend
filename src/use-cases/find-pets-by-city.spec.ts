import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FindPetsByCityUseCase } from './find-pets-by-city'
import { Prisma } from 'generated/prisma'
import { BrazilianState } from '@/utils/states'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FindPetsByCityUseCase

describe('Find Pets By City Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetsByCityUseCase(petsRepository)
  })

  it('should find pets by city', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Buddy',
      description: 'Friendly dog',
      age: 'Jovem',
      size: 'Médio',
      energy_level: 'Alta',
      independence: 'Baixa',
      environment: 'Aberto',
      org_id: org.id,
      adopted_at: null,
    })

    await petsRepository.create({
      name: 'Luna',
      description: 'Calm cat',
      age: 'Idoso',
      size: 'Pequeno',
      energy_level: 'Baixa',
      independence: 'Alta',
      environment: 'Fechado',
      org_id: org.id,
      adopted_at: null,
    })

    petsRepository.items[0].org = org
    petsRepository.items[1].org = org

    const { pets } = await sut.execute({
      city: 'Curitiba',
      state: BrazilianState.PR,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
        org_id: org.id,
        org: expect.objectContaining({ city: 'Curitiba' }),
      }),
      expect.objectContaining({
        name: 'Luna',
        org_id: org.id,
        org: expect.objectContaining({ city: 'Curitiba' }),
      }),
    ])
  })

  it('should find pets by city case-insensitive', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Buddy',
      description: 'Friendly dog',
      age: 'Jovem',
      size: 'Médio',
      energy_level: 'Alta',
      independence: 'Baixa',
      environment: 'Aberto',
      org_id: org.id,
      adopted_at: null,
    })

    await petsRepository.create({
      name: 'Luna',
      description: 'Calm cat',
      age: 'Idoso',
      size: 'Pequeno',
      energy_level: 'Baixa',
      independence: 'Alta',
      environment: 'Fechado',
      org_id: org.id,
      adopted_at: null,
    })

    petsRepository.items[0].org = org
    petsRepository.items[1].org = org

    const { pets } = await sut.execute({
      city: 'cUriTibA',
      state: BrazilianState.PR,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
        org_id: org.id,
        org: expect.objectContaining({
          city: 'Curitiba',
          state: BrazilianState.PR,
        }),
      }),
      expect.objectContaining({
        name: 'Luna',
        org_id: org.id,
        org: expect.objectContaining({
          city: 'Curitiba',
          state: BrazilianState.PR,
        }),
      }),
    ])
  })

  it('should find pets by city and additional filters', async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Buddy',
      description: 'Friendly dog',
      age: 'Jovem',
      size: 'Médio',
      energy_level: 'Alta',
      independence: 'Baixa',
      environment: 'Aberto',
      org_id: org.id,
      adopted_at: null,
    })

    await petsRepository.create({
      name: 'Luna',
      description: 'Calm cat',
      age: 'Idoso',
      size: 'Pequeno',
      energy_level: 'Baixa',
      independence: 'Alta',
      environment: 'Fechado',
      org_id: org.id,
      adopted_at: null,
    })

    petsRepository.items[0].org = org
    petsRepository.items[1].org = org

    const { pets } = await sut.execute({
      city: 'Curitiba',
      state: BrazilianState.PR,
      filters: {
        age: 'Jovem',
        energy_level: 'Alta',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
        age: 'Jovem',
        energy_level: 'Alta',
        org: expect.objectContaining({
          city: 'Curitiba',
          state: BrazilianState.PR,
        }),
        adopted_at: null,
      }),
    ])
  })

  it('should return empty array if no pets are found for city or state', async () => {
    const orgPR = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Buddy',
      description: 'Friendly dog',
      age: 'Jovem',
      size: 'Médio',
      energy_level: 'Alta',
      independence: 'Baixa',
      environment: 'Aberto',
      org_id: orgPR.id,
      adopted_at: null,
    })

    petsRepository.items[0].org = orgPR

    const { pets } = await sut.execute({
      city: 'Curitiba',
      state: BrazilianState.SP,
    })

    expect(pets).toHaveLength(0)
  })

  it('should only return pets that are not adopted', async () => {
    const orgPR = await orgsRepository.create({
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

    await petsRepository.create({
      name: 'Buddy',
      description: 'Friendly dog',
      age: 'Jovem',
      size: 'Médio',
      energy_level: 'Alta',
      independence: 'Baixa',
      environment: 'Aberto',
      org_id: orgPR.id,
      adopted_at: null,
    })

    await petsRepository.create({
      name: 'Max',
      description: 'Playful dog',
      age: 'Jovem',
      size: 'Grande',
      energy_level: 'Alta',
      independence: 'Média',
      environment: 'Aberto',
      org_id: orgPR.id,
      adopted_at: new Date('2025-07-01'),
    })

    petsRepository.items[0].org = orgPR
    petsRepository.items[1].org = orgPR

    const { pets } = await sut.execute({
      city: 'Curitiba',
      state: BrazilianState.PR,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
        org_id: orgPR.id,
        org: expect.objectContaining({
          city: 'Curitiba',
          state: BrazilianState.PR,
        }),
        adopted_at: null,
      }),
    ])
    expect(pets).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Max' })]),
    )
  })

  it('should find pets by city without state', async () => {
    const orgPR = await orgsRepository.create({
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

    const orgSP = await orgsRepository.create({
      name: 'Org Two',
      email: 'org2@example.com',
      password_hash: 'hashed-password',
      whatsapp: '119123456789',
      street: 'Rua Teste SP',
      city: 'Curitiba',
      state: BrazilianState.SP,
      postal_code: '81010360',
      latitude: new Prisma.Decimal(-23.55052),
      longitude: new Prisma.Decimal(-46.633308),
    })

    await petsRepository.create({
      name: 'Buddy',
      description: 'Friendly dog',
      age: 'Jovem',
      size: 'Médio',
      energy_level: 'Alta',
      independence: 'Baixa',
      environment: 'Aberto',
      org_id: orgPR.id,
      adopted_at: null,
    })

    await petsRepository.create({
      name: 'Luna',
      description: 'Calm cat',
      age: 'Idoso',
      size: 'Pequeno',
      energy_level: 'Baixa',
      independence: 'Alta',
      environment: 'Fechado',
      org_id: orgSP.id,
      adopted_at: null,
    })

    petsRepository.items[0].org = orgPR
    petsRepository.items[1].org = orgSP

    const { pets } = await sut.execute({
      city: 'Curitiba',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
        org_id: orgPR.id,
        org: expect.objectContaining({
          city: 'Curitiba',
          state: BrazilianState.PR,
        }),
        adopted_at: null,
      }),
      expect.objectContaining({
        name: 'Luna',
        org_id: orgSP.id,
        org: expect.objectContaining({
          city: 'Curitiba',
          state: BrazilianState.SP,
        }),
        adopted_at: null,
      }),
    ])
  })
})
