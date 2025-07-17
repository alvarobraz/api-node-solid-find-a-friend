import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { FetchOrgsByStateAndCityUseCase } from '../fetch-orgs-by-state-and-city'

export function makeFetchOrgsByStatesAndCityUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const fetchOrgsByStateAndCityUseCase = new FetchOrgsByStateAndCityUseCase(
    orgsRepository,
  )

  return fetchOrgsByStateAndCityUseCase
}
