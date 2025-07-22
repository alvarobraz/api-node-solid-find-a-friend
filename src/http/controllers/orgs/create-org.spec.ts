import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { BrazilianState } from '@/utils/states'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an organization', async () => {
    const response = await request(app.server).post('/orgs').send({
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

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create an organization with an existing email', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org One',
      email: 'orgtwo@example.com',
      password: '1234567',
      whatsapp: '419123456789',
      street: 'Ciryllo Merlin, 59',
      city: 'Curitiba',
      state: BrazilianState.PR,
      postal_code: '81010360',
      latitude: -25.4795628,
      longitude: -49.2862921,
    })

    const response = await request(app.server).post('/orgs').send({
      name: 'Org Two',
      email: 'orgtwo@example.com',
      password: '1234567',
      whatsapp: '419987654321',
      street: 'Rua das Flores, 123',
      city: 'Curitiba',
      state: BrazilianState.PR,
      postal_code: '81020360',
      latitude: -25.48,
      longitude: -49.28,
    })

    expect(response.statusCode).toEqual(409)
    expect(response.body).toEqual({ message: 'E-mail already exists.' })
  })

  it('should not be able to create an organization with an invalid state', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org One',
      email: 'orgone@example.com',
      password: '1234567',
      whatsapp: '419123456789',
      street: 'Ciryllo Merlin, 59',
      city: 'Curitiba',
      state: 'XX',
      postal_code: '81010360',
      latitude: -25.4795628,
      longitude: -49.2862921,
    })

    expect(response.statusCode).toEqual(400)
  })
})
