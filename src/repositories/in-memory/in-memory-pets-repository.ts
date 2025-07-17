import { Prisma, Pet } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: 'pet-1',
      name: data.name,
      description: data.description ?? null,
      age: data.age ?? null,
      size: data.size ?? null,
      energy_level: data.energy_level ?? null,
      independence: data.independence ?? null,
      environment: data.environment ?? null,
      org_id: data.org_id,
      created_at: new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
    }

    this.items.push(pet)

    return pet
  }
}
