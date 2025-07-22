import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { AdoptPetUseCase } from './adot-pet'
import { CreateOrgUseCase } from './create-org'
import { CreatePetUseCase } from './create-pet'
import { BrazilianState } from '@/utils/states'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let createOrgUseCase: CreateOrgUseCase
let createPetUseCase: CreatePetUseCase
let adoptPetUseCase: AdoptPetUseCase

describe('Update Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)
    createPetUseCase = new CreatePetUseCase(petsRepository)
    adoptPetUseCase = new AdoptPetUseCase(petsRepository)
  })

  it('should update a pet with new data', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'Org One',
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

    const { pet: createdPet } = await createPetUseCase.execute({
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
      requirements: ['Casa com quintal', 'Passeios diários'],
    })

    const updatedData = {
      id: createdPet.id,
      adopted_at: new Date('2025-07-22T03:40:30.339Z'),
    }

    const { pet } = await adoptPetUseCase.execute(updatedData)

    expect(pet.id).toEqual(createdPet.id)
    expect(pet.adopted_at).toEqual(updatedData.adopted_at)
    expect(pet.org_id).toEqual(org.id)

    expect(pet.org).toEqual(
      expect.objectContaining({
        id: org.id,
        name: 'Org One',
        city: 'Curitiba',
        state: BrazilianState.PR,
      }),
    )
  })

  it('should throw ResourceNotFoundError if pet does not exist', async () => {
    await expect(
      adoptPetUseCase.execute({
        id: 'non-existent-id',
        adopted_at: new Date('2025-07-22T03:40:30.339Z'),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
