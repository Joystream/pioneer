import { seedOverridableEntities } from '../helpers/seedEntities'

import { BlockFieldsMock } from './common'
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
  entrantWhitelist?: string[]
  workPeriod: number
  judgingPeriod: number
  stage: string
  totalFunding: string
  discussionThreadId: string
  createdInEvent: BlockFieldsMock
  maxFundingReachedEvent?: BlockFieldsMock
  isTerminated?: boolean
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
  works?: RawWorkSubmittedEventMock[]
  status: { type: string; reward?: string }
  announcedInEvent: BlockFieldsMock
}

export interface RawWorkSubmittedEventMock extends BlockFieldsMock {
  title: string
  description: string
}

const seedFundingType = ({ type, ...data }: RawBountyMock['fundingType'], server: any) =>
  server.schema.create(`BountyFunding${type}`, data)

const seedEntrantWhitelist = (memberIds: RawBountyMock['entrantWhitelist'], server: any) =>
  server.schema.create('BountyEntrantWhitelist', { memberIds })

export const seedBounty = (
  {
    fundingType,
    entrantWhitelist,
    createdInEvent,
    maxFundingReachedEvent,
    isTerminated = false,
    ...data
  }: RawBountyMock,
  server: any
) =>
  server.schema.create('Bounty', {
    ...data,
    isTerminated,
    fundingType: seedFundingType(fundingType, server),
    entrantWhitelist: entrantWhitelist ? seedEntrantWhitelist(entrantWhitelist, server) : null,
    createdInEvent: server.schema.create('BountyCreatedEvent', createdInEvent),
    ...(maxFundingReachedEvent
      ? { maxFundingReachedEvent: server.schema.create('BountyMaxFundingReachedEvent', createdInEvent) }
      : {}),
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

export const seedBountyEntry = ({ works, status, announcedInEvent, ...data }: RawBountyEntryMock, server: any) =>
  server.schema.create('BountyEntry', {
    ...data,
    works: works?.map((work) => server.schema.create('WorkSubmittedEvent', work)) ?? [],
    status: seedEntryStatus(status, server),
    announcedInEvent: server.schema.create('WorkEntryAnnouncedEvent', announcedInEvent),
  })

export const seedBountyEntries = seedOverridableEntities(rawEntries, seedBountyEntry)
