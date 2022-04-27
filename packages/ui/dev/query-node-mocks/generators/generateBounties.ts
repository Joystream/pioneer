import faker, { datatype, lorem, random } from 'faker'

import { Reducer } from '@/common/types/helpers'
import { RawBountyMock, RawBountyContributionMock, RawBountyEntryMock } from '@/mocks/data/seedBounties'
import { RawForumThreadMock } from '@/mocks/data/seedForum'

import { randomRawBlock } from '../../../src/mocks/helpers/randomBlock'
import { saveFile } from '../helpers/saveFile'

import { ForumThreadStatus } from './forum/generateForumThreads'
import { MemberMock } from './generateMembers'
import { randomFromRange, randomFromWeightedSet, randomMarkdown, randomMember, randomMessage, repeat } from './utils'

interface DependOnMocks {
  members: MemberMock[]
  forumThreads: RawForumThreadMock[]
}

interface BountyData {
  bounties: RawBountyMock[]
  bountyContributions: RawBountyContributionMock[]
  bountyEntries: RawBountyEntryMock[]
}

const NUMBER_OF_BOUNTIES = 12

export const generateBounties = (
  mocks: DependOnMocks = {
    members: require('../../../src/mocks/data/raw/members.json'),
    forumThreads: require('../../../src/mocks/data/raw/forumThreads.json'),
  }
) => {
  const forumThreads = mocks.forumThreads.filter((thread) => thread.status.__typename === ForumThreadStatus.Active)
  const generate = generateBounty({ ...mocks, forumThreads })

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
  // Generate the bounty
  const stage = bountyStage()
  const creatorId =
    bountyIndex < 3 ? String(bountyIndex % 2) : Math.random() < 0.7 ? randomMember(mocks.members).id : undefined
  const oracleId =
    bountyIndex < 3 ? String((bountyIndex + 1) % 2) : Math.random() < 0.7 ? randomMember(mocks.members).id : undefined
  const bounty = {
    id: String(bountyIndex),
    createdAt: faker.date.recent(20),
    title: lorem.sentence(),
    description: randomMarkdown(),
    cherry: String(randomFromRange(1, 5) * 1000),
    entrantStake: String(randomFromRange(1, 5) * 1000),
    creatorId: creatorId,
    oracleId: oracleId,
    fundingType: generateBountyFundingType(),
    entrantWhitelist: datatype.boolean()
      ? random.arrayElements(mocks.members, randomFromRange(1, 10)).map(({ id }) => id)
      : undefined,
    workPeriod: randomFromRange(5, 20),
    judgingPeriod: randomFromRange(5, 20),
    stage,
    totalFunding: String(randomFromRange(5, 10) * 1000),
    discussionThreadId: random.arrayElement(mocks.forumThreads).id,
    createdInEvent: randomRawBlock(),
    ...(datatype.boolean() ? { maxFundingReachedEvent: randomRawBlock() } : {}),
    isTerminated: Math.random() < 0.2 && ['Funding', 'Expired', 'Successful', 'Failed'].includes(stage),
  }

  // Generate the bounty contributions
  const contributions = repeat(generateContribution(mocks, bounty), randomFromRange(0, 5))

  // Generate the bounty work entries
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
    ...(datatype.boolean() ? { contributorId: randomMember(mocks.members).id } : {}),
    amount: String(randomFromRange(1, 5) * 1000),
  }
}

const generateEntry = (mocks: DependOnMocks, bounty: RawBountyMock) => (entryIndex: number): RawBountyEntryMock => {
  const randomStatus = randomFromWeightedSet(
    [4, { type: 'Working' }],
    [1, { type: 'Withdrawn' }],
    [1, { type: 'Winner', reward: String(Number(bounty.totalFunding) / randomFromRange(1, 3)) }],
    [1, { type: 'Passed' }],
    [1, { type: 'Rejected' }]
  )
  const worker = randomMember(mocks.members)
  const works = repeat(generateWork, randomFromRange(0, 5))

  return {
    id: `${bounty.id}:${entryIndex}`,
    bountyId: bounty.id,
    workerId: worker.id,
    stake: bounty.entrantStake,
    stakingAccount: worker.controllerAccount,
    workSubmitted: works.length > 0,
    works: works[0] && works,
    status: randomStatus(),
    announcedInEvent: randomRawBlock(),
  }
}

export const generateWork = () => ({ ...randomRawBlock(), title: lorem.sentence(), description: randomMessage() })

const generateBountyFundingType = (isPerpetual = datatype.boolean()) =>
  isPerpetual
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
