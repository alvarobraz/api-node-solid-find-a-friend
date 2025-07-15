import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface createOrgUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  street: string
  city: string
  state: string
  postal_code: string
  latitude: string
  longitude: string
}

export async function registerUseCase({
  name,
  email,
  password,
  whatsapp,
  street,
  city,
  state,
  postal_code,
  latitude,
  longitude,
}: createOrgUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.org.create({
    data: {
      name,
      email,
      password_hash,
      whatsapp,
      street,
      city,
      state,
      postal_code,
      latitude,
      longitude,
    },
  })
}
