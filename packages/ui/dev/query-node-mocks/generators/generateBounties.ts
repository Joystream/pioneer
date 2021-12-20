import { datatype, lorem, random } from 'faker'

import { Reducer } from '@/common/types/helpers'
import { RawBountyMock, RawBountyContributionMock, RawBountyEntryMock } from '@/mocks/data/seedBounties'

import { saveFile } from '../helpers/saveFile'

import { MemberMock } from './generateMembers'
import { randomFromRange, randomFromWeightedSet, randomMarkdown, randomMember, randomMessage, repeat } from './utils'

interface DependOnMocks {
  members: MemberMock[]
}

interface BountyData {
  bounties: RawBountyMock[]
  bountyContributions: RawBountyContributionMock[]
  bountyEntries: RawBountyEntryMock[]
}

const NUMBER_OF_BOUNTIES = 8

export const generateBounties = (mocks?: DependOnMocks) => {
  const generate = generateBounty(
    mocks ?? {
      members: require('../../../src/mocks/data/raw/members.json'),
    }
  )

  return Array.from({ length: NUMBER_OF_BOUNTIES }).reduce(generate, {
    bounties: [],
    bountyContributions: [],
    bountyEntries: [],
  })
}

export const bountyModule = {
  command: 'bounty',
  describe: 'Generate bounties from other mocks',
  handler: () => Object.entries(generateBounties()).forEach(([fileName, contents]) => saveFile(fileName, contents)),
}

const bountyStage = randomFromWeightedSet(
  [4, 'Funding'],
  [1, 'Expired'],
  [4, 'WorkSubmission'],
  [1, 'Judgment'],
  [1, 'Successful'],
  [1, 'Failed']
)

const generateBounty = (mocks: DependOnMocks): Reducer<BountyData, any> => (data, _, bountyIndex) => {
  const memberIds = mocks.members.map(({ id }) => id)
  const fundingType = datatype.boolean()
    ? {
        type: 'Perpetual',
        target: String(randomFromRange(5, 10) * 1000),
      }
    : {
        type: 'Limited',
        minFundingAmount: String(randomFromRange(5, 7) * 1000),
        maxFundingAmount: String(randomFromRange(8, 10) * 1000),
        fundingPeriod: randomFromRange(5, 20),
      }
  const contractType = datatype.boolean()
    ? {
        type: 'Open',
      }
    : {
        type: 'Closed',
        whitelistIds: random.arrayElements(memberIds, randomFromRange(1, 10)),
      }

  const bounty = {
    id: String(bountyIndex),
    title: lorem.sentence(),
    description: randomMarkdown(),
    cherry: String(randomFromRange(1, 5) * 1000),
    entrantStake: String(randomFromRange(1, 5) * 1000),
    ...(datatype.boolean() ? { creatorId: randomMember(mocks.members).id } : {}),
    ...(datatype.boolean() ? { oracleId: randomMember(mocks.members).id } : {}),
    fundingType,
    contractType,
    workPeriod: randomFromRange(5, 20),
    judgingPeriod: randomFromRange(5, 20),
    stage: bountyStage(),
    totalFunding: String(randomFromRange(5, 10) * 1000),
  }

  const contributions = repeat(generateContribution(mocks, bounty), randomFromRange(0, 5))

  const entries = repeat(generateEntry(mocks, bounty), randomFromRange(0, 5))

  return {
    bounties: [...data.bounties, bounty],
    bountyContributions: [...data.bountyContributions, ...contributions],
    bountyEntries: [...data.bountyEntries, ...entries],
  }
}

const generateContribution = (mocks: DependOnMocks, bounty: RawBountyMock) => (
  contributionIndex: number
): RawBountyContributionMock => {
  return {
    id: `${bounty.id}:${contributionIndex}`,
    bountyId: bounty.id,
    amount: String(randomFromRange(1, 5) * 1000),
  }
}

const generateEntry = (mocks: DependOnMocks, bounty: RawBountyMock) => (entryIndex: number): RawBountyEntryMock => {
  const randomStatus = randomFromWeightedSet(
    [4, { type: 'Working' }],
    [1, { type: 'Withdrawn' }],
    [1, { type: 'Winner', reward: String(Number(bounty.totalFunding) / randomFromRange(1, 3)) }],
    [1, { type: 'Passed' }],
    [1, { type: 'Rejected' }],
    [1, { type: 'CashedOut' }]
  )
  const worker = randomMember(mocks.members)
  const works = repeat(() => randomMessage(), randomFromRange(0, 5))

  return {
    id: `${bounty.id}:${entryIndex}`,
    bountyId: bounty.id,
    workerId: worker.id,
    stake: bounty.entrantStake,
    stakingAccount: worker.controllerAccount,
    workSubmitted: works.length > 0,
    works,
    status: randomStatus(),
  }
}
