import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { CreateOrgUseCase } from './create-org'
import { GetPetUseCase } from './get-pet'
import { BrazilianState } from '@/utils/states'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let createOrgUseCase: CreateOrgUseCase
let createPetUseCase: CreatePetUseCase
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)
    createPetUseCase = new CreatePetUseCase(petsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should create a pet with org id and show its details', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'Org one',
      email: 'orgone@example.com',
      password: '1234567',
      whatsapp: '419123456789',
      street: 'Ciryllo Merlin, 59',
      city: 'Curitiba',
      state: BrazilianState.PR,
      postal_code: '81010360',
      latitude: -25.4795628,
      longitude: -49.2862921,
    })

    expect(org.id).toEqual(expect.any(String))

    const { pet } = await createPetUseCase.execute({
      name: 'Myah',
      description:
        'Sou uma gata bem caseira e bem individual, mas adoro meus donos, sou um belo cobertor de pernas',
      age: 'Jovem',
      size: 'Pequenina',
      energy_level: 'Média',
      independence: '(Alta) Necessita apenas que troque comida e areia)',
      environment: 'Fechado',
      org_id: org.id,
      adopted_at: null,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.org_id).toEqual(org.id)

    const { pet: foundPet } = await sut.execute({
      id: pet.id,
    })

    expect(foundPet).toEqual(
      expect.objectContaining({
        id: pet.id,
        name: 'Myah',
        description:
          'Sou uma gata bem caseira e bem individual, mas adoro meus donos, sou um belo cobertor de pernas',
        age: 'Jovem',
        size: 'Pequenina',
        energy_level: 'Média',
        independence: '(Alta) Necessita apenas que troque comida e areia)',
        environment: 'Fechado',
        org_id: org.id,
        adopted_at: null,
        org: expect.objectContaining({
          id: org.id,
          name: 'Org one',
          city: 'Curitiba',
          state: BrazilianState.PR,
        }),
      }),
    )
  })

  it('should throw ResourceNotFoundError if pet is not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw ResourceNotFoundError if pet is adopted', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'Org one',
      email: 'orgone@example.com',
      password: '1234567',
      whatsapp: '419123456789',
      street: 'Ciryllo Merlin, 59',
      city: 'Curitiba',
      state: BrazilianState.PR,
      postal_code: '81010360',
      latitude: -25.4795628,
      longitude: -49.2862921,
    })

    const { pet } = await createPetUseCase.execute({
      name: 'Myah',
      description:
        'Sou uma gata bem caseira e bem individual, mas adoro meus donos, sou um belo cobertor de pernas',
      age: 'Jovem',
      size: 'Pequenina',
      energy_level: 'Média',
      independence: '(Alta) Necessita apenas que troque comida e areia)',
      environment: 'Fechado',
      org_id: org.id,
      adopted_at: new Date('2025-07-01'),
    })

    await expect(() =>
      sut.execute({
        id: pet.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
