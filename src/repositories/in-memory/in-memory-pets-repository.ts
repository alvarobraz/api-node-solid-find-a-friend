import {
  Prisma,
  Pet,
  Org,
  PetImage,
  AdoptionRequirement,
} from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { BrazilianState } from '@/utils/states'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Array<
    Pet & {
      org?: Org
      images?: PetImage[]
      requirements?: AdoptionRequirement[]
    }
  > = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet & {
      org?: Org
      images?: PetImage[]
      requirements?: AdoptionRequirement[]
    } = {
      id: data.id ?? 'pet-' + Math.random().toString(36).substr(2, 9),
      name: data.name,
      description: data.description ?? null,
      age: data.age ?? null,
      size: data.size ?? null,
      energy_level: data.energy_level ?? null,
      independence: data.independence ?? null,
      environment: data.environment ?? null,
      created_at: new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      org_id: data.org_id,
      org: undefined,
    }

    this.items.push(pet)

    return pet
  }

  async findByCityAndProperties(
    city: string,
    state: BrazilianState,
    filters: Partial<{
      name: string
      description: string
      age: string
      size: string
      energy_level: string
      independence: string
      environment: string
    }> = {},
  ): Promise<Pet[]> {
    return this.items.filter((item) => {
      const matchesCity = item.org?.city
        ? item.org.city.toLowerCase() === city.toLowerCase()
        : false
      const matchesState = item.org?.state ? item.org.state === state : false
      const matchesAdopted = item.adopted_at === null
      const matchesName = filters.name
        ? item.name.toLowerCase().includes(filters.name.toLowerCase())
        : true
      const matchesDescription = filters.description
        ? item.description
            ?.toLowerCase()
            .includes(filters.description.toLowerCase())
        : true
      const matchesAge = filters.age
        ? item.age?.toLowerCase().includes(filters.age.toLowerCase())
        : true
      const matchesSize = filters.size
        ? item.size?.toLowerCase().includes(filters.size.toLowerCase())
        : true
      const matchesEnergyLevel = filters.energy_level
        ? item.energy_level
            ?.toLowerCase()
            .includes(filters.energy_level.toLowerCase())
        : true
      const matchesIndependence = filters.independence
        ? item.independence
            ?.toLowerCase()
            .includes(filters.independence.toLowerCase())
        : true
      const matchesEnvironment = filters.environment
        ? item.environment
            ?.toLowerCase()
            .includes(filters.environment.toLowerCase())
        : true

      return (
        matchesCity &&
        matchesState &&
        matchesAdopted &&
        matchesName &&
        matchesDescription &&
        matchesAge &&
        matchesSize &&
        matchesEnergyLevel &&
        matchesIndependence &&
        matchesEnvironment
      )
    })
  }
}
