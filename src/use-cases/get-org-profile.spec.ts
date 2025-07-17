import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetOrgProfileUseCase } from '@/use-cases/get-org-profile'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'Org One',
      email: 'orgone@example.com',
      password_hash: await hash('1234567', 6),
      whatsapp: '419123456789',
      street: 'Ciryllo Merlin, 59',
      city: 'Curitiba',
      state: 'PR',
      postal_code: '81010360',
      latitude: -25.4795628,
      longitude: -49.2862921,
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.name).toEqual('Org One')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
