import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should to create a org', async () => {
    const { org } = await sut.execute({
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
  })

  it('should hash org password upon create org', async () => {
    const { org } = await sut.execute({
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

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create a org with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'Org One',
      email,
      password: '1234567',
      whatsapp: '419123456789',
      street: 'Ciryllo Merlin, 59',
      city: 'Curitiba',
      state: 'Paraná',
      postal_code: '81010360',
      latitude: -25.4795628,
      longitude: -49.2862921,
    })

    await expect(() =>
      sut.execute({
        name: 'Org One',
        email,
        password: '1234567',
        whatsapp: '419123456789',
        street: 'Ciryllo Merlin, 59',
        city: 'Curitiba',
        state: 'Paraná',
        postal_code: '81010360',
        latitude: -25.4795628,
        longitude: -49.2862921,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
