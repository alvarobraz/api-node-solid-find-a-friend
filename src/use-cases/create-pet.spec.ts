import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let createOrgUseCase: CreateOrgUseCase
let createPetUseCase: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)
    createPetUseCase = new CreatePetUseCase(petsRepository)
  })

  it('should to create a pet with org id', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'Org one',
      email: 'orgone@example.com',
      password: '1234567',
      whatsapp: '419123456789',
      street: 'Ciryllo Merlin, 59',
      city: 'Curitiba',
      state: 'Paraná',
      postal_code: '81010360',
      latitude: -25.4795628,
      longitude: -49.2862921,
    })

    expect(org.id).toEqual(expect.any(String))

    const { pet } = await createPetUseCase.execute({
      name: 'Myah',
      description:
        'Sou uma gata bem caseira e bem individual, mas adoro meus donos, sou um belo cobertor de pernas',
      age: 'Joven',
      size: 'Pequenina',
      energy_level: 'Média',
      independence: '(Alta) Necessita apenas que troque comida e areia)',
      environment: 'Fechado',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.org_id).toEqual(org.id)
  })
})
