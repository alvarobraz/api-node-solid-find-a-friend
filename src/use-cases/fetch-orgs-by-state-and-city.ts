import { OrgsRepository } from '@/repositories/orgs-repository'
import { BrazilianState } from '@/utils/states'

import { Org } from 'generated/prisma'

interface FetchOrgsByStateAndCityRequest {
  state: BrazilianState
  city: string
}

interface FetchOrgsByStateAndCityResponse {
  orgs: Org[]
}

export class FetchOrgsByStateAndCityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    state,
    city,
  }: FetchOrgsByStateAndCityRequest): Promise<FetchOrgsByStateAndCityResponse> {
    const orgs = await this.orgsRepository.fetchByStateAndCity(state, city)

    return {
      orgs,
    }
  }
}
