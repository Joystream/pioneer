import { seedOverridableEntities } from '../helpers/seedEntities'

import rawBounties from './raw/bounties.json'
import rawContributions from './raw/bountyContributions.json'
import rawEntries from './raw/bountyEntries.json'

export interface RawBountyMock {
  id: string
  title: string
  description: string
  cherry: string
  entrantStake: string
  creatorId?: string
  oracleId?: string
  fundingType:
    | { type: string; target: string }
    | { type: string; minFundingAmount: string; maxFundingAmount: string; fundingPeriod: number }
  contractType: { type: string; whitelistIds?: string[] }
  workPeriod: number
  judgingPeriod: number
  stage: string
  totalFunding: string
}

export interface RawBountyContributionMock {
  id: string
  bountyId: string
  contributor?: string
  amount: string
}

export interface RawBountyEntryMock {
  id: string
  bountyId: string
  workerId: string
  stake: string
  stakingAccount: string
  workSubmitted: boolean
  works: RawBountyWorkDataMock[]
  status: { type: string; reward?: string }
}

export interface RawBountyWorkDataMock {
  title: string
  description: string
}

const seedFundingType = ({ type, ...data }: RawBountyMock['fundingType'], server: any) =>
  server.schema.create(`BountyFunding${type}`, data)

const seedContractType = ({ type, ...data }: RawBountyMock['contractType'], server: any) =>
  server.schema.create(`BountyContract${type}`, data)

export const seedBounty = ({ fundingType, contractType, ...data }: RawBountyMock, server: any) =>
  server.schema.create('Bounty', {
    ...data,
    fundingType: seedFundingType(fundingType, server),
    contractType: seedContractType(contractType, server),
  })

export const seedBounties = seedOverridableEntities<RawBountyMock>(rawBounties, seedBounty)

export const seedBountyContribution = (data: RawBountyContributionMock, server: any) =>
  server.schema.create('BountyContribution', data)

export const seedBountyContributions = seedOverridableEntities<RawBountyContributionMock>(
  rawContributions,
  seedBountyContribution
)

const seedEntryStatus = ({ type, ...data }: RawBountyEntryMock['status'], server: any) =>
  server.schema.create(`BountyEntryStatus${type}`, data)

export const seedBountyEntry = ({ works, status, ...data }: RawBountyEntryMock, server: any) =>
  server.schema.create('BountyEntry', {
    ...data,
    works: works.map((work) => server.schema.create('BountyWorkData', work)),
    status: seedEntryStatus(status, server),
  })

export const seedBountyEntries = seedOverridableEntities(rawEntries, seedBountyEntry)
