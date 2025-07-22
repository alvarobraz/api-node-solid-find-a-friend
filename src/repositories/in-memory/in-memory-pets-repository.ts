import { Org, Pet, Prisma } from 'generated/prisma'
import { BrazilianState } from '@/utils/states'
import { PetsRepository } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: (Pet & { requirements: { description: string }[] })[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) return null
    return {
      ...pet,
      org: (await this.orgsRepository.findById(pet.org_id)) ?? undefined,
    }
  }

  async create(
    data: Prisma.PetUncheckedCreateInput & {
      requirements?: { create: { description: string }[] }
    },
  ) {
    const pet: Pet & { requirements: { description: string }[] } = {
      id: data.id || 'generated-id',
      name: data.name,
      description: data.description ?? null,
      age: data.age ?? null,
      size: data.size ?? null,
      energy_level: data.energy_level ?? null,
      independence: data.independence ?? null,
      environment: data.environment ?? null,
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      org_id: data.org_id,
      requirements:
        data.requirements?.create.map((req) => ({
          description: req.description,
          id: 'generated-requirement-id',
          created_at: new Date(),
        })) || [],
    }

    this.items.push(pet)
    return pet
  }

  async findByCityAndProperties(
    city: string,
    state?: BrazilianState,
    filters: Partial<{
      name: string
      description: string
      age: string
      size: string
      energy_level: string
      independence: string
      environment: string
    }> = {},
  ) {
    const pets = await Promise.all(
      this.items
        .filter((pet) => {
          const org = this.orgsRepository.items.find(
            (org) => org.id === pet.org_id,
          )
          const matchesCity = org?.city === city
          const matchesState = state ? org?.state === state : true
          const matchesFilters = filters
            ? Object.entries(filters).every(
                ([key, value]) => pet[key as keyof typeof pet] === value,
              )
            : true
          const matchesAdopted = pet.adopted_at === null
          return matchesCity && matchesState && matchesFilters && matchesAdopted
        })
        .map(async (pet) => ({
          ...pet,
          org: (await this.orgsRepository.findById(pet.org_id)) ?? undefined,
        })),
    )
    return pets
  }

  async findOrgById(org_id: string) {
    return this.orgsRepository.findById(org_id)
  }

  async save(
    data: Pet,
  ): Promise<Pet & { org?: Org; requirements?: { description: string }[] }> {
    const existingPetIndex = this.items.findIndex((item) => item.id === data.id)
    if (existingPetIndex === -1) {
      throw new Error('Pet not Found')
    }

    const updatedPet: Pet & { requirements: { description: string }[] } = {
      ...this.items[existingPetIndex],
      ...data,
    }

    this.items[existingPetIndex] = updatedPet

    const org = await this.orgsRepository.findById(updatedPet.org_id)

    return {
      ...updatedPet,
      org: org ?? undefined,
    }
  }
}
