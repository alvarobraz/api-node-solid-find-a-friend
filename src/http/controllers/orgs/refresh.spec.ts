import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org One',
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'orgone@example.com',
      password: '1234567',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies || [])
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
