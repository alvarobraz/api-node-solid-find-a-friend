import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { BrazilianState } from '@/utils/states'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const orgResponse = await request(app.server).post('/orgs').send({
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

    expect(orgResponse.statusCode).toEqual(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'orgone@example.com',
      password: '1234567',
    })

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toHaveProperty('token')

    const token = authResponse.body.token

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Myah',
        description: 'Sou uma gata bem caseira e bem individual',
        age: 'Jovem',
        size: 'Pequenina',
        energy_level: 'Média',
        independence: '(Alta) Necessita apenas que troque comida e areia)',
        environment: 'Fechado',
        requirements: ['Casa com quintal', 'Passeios diários'],
      })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a pet with invalid data', async () => {
    await request(app.server).post('/orgs').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'orgone@example.com',
      password: '1234567',
    })

    const token = authResponse.body.token

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Sou uma gata bem caseira',
        age: 'Jovem',
        size: 'Pequenina',
        energy_level: 'Média',
        independence: 'Alta',
        environment: 'Fechado',
        requirements: ['Casa com quintal'],
      })

    expect(response.statusCode).toEqual(400)
  })

  it('should not be able to create a pet without authentication', async () => {
    const response = await request(app.server)
      .post('/pets')
      .send({
        name: 'Myah',
        description: 'Sou uma gata bem caseira e bem individual',
        age: 'Jovem',
        size: 'Pequenina',
        energy_level: 'Média',
        independence: '(Alta) Necessita apenas que troque comida e areia)',
        environment: 'Fechado',
        requirements: ['Casa com quintal', 'Passeios diários'],
      })

    expect(response.statusCode).toEqual(401)
  })
})
