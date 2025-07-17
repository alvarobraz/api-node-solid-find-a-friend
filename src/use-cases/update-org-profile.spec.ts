import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { UpdateOrgUseCase } from './update-org-profile'
import { BrazilianState } from '@/utils/states'

let orgsRepository: InMemoryOrgsRepository
let createOrgUseCase: CreateOrgUseCase
let updateOrgUseCase: UpdateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)
    updateOrgUseCase = new UpdateOrgUseCase(orgsRepository)
  })

  it('should to update a your org', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'Org Original',
      email: 'original@example.com',
      password: '1234567',
      whatsapp: '419123456789',
      street: 'Rua A',
      city: 'Cidade A',
      state: BrazilianState.PR,
      postal_code: '00000000',
      latitude: -25.0,
      longitude: -49.0,
    })

    const { org: updatedOrg } = await updateOrgUseCase.execute({
      orgId: org.id,
      updates: {
        name: 'Org Updated',
        city: 'Cidade B',
      },
    })

    expect(updatedOrg.name).toBe('Org Updated')
    expect(updatedOrg.city).toBe('Cidade B')
    expect(updatedOrg.id).toBe(org.id)
  })
})
