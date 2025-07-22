import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FindPetsByCityUseCase } from './find-pets-by-city'
import { CreatePetUseCase } from './create-pet'
import { CreateOrgUseCase } from './create-org'
import { BrazilianState } from '@/utils/states'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let createOrgUseCase: CreateOrgUseCase
let createPetUseCase: CreatePetUseCase
let findPetsByCityUseCase: FindPetsByCityUseCase

describe('Find Pets By City Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)
    createPetUseCase = new CreatePetUseCase(petsRepository)
    findPetsByCityUseCase = new FindPetsByCityUseCase(petsRepository)
  })

  it('should find pets by city', async () => {
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
      adopted_at: null,
      requirements: ['Casa com quintal', 'Passeios diários'],
    })

    const pets = await findPetsByCityUseCase.execute({
      city: 'Curitiba',
      state: BrazilianState.PR,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
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
        created_at: expect.any(Date),
        requirements: expect.arrayContaining([
          expect.objectContaining({ description: 'Casa com quintal' }),
          expect.objectContaining({ description: 'Passeios diários' }),
        ]),
        org: expect.objectContaining({
          id: org.id,
          name: 'Org one',
          city: 'Curitiba',
          state: BrazilianState.PR,
        }),
      }),
    )
  })
})
