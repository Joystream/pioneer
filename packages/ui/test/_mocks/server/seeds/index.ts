import { RawOpeningMock, RawWorker } from '@/mocks/data'
import { RawUpcomingOpeningMock } from '@/mocks/data/seedUpcomingOpening'

import { ProposalMock } from '../../../../dev/scripts/generators/generateProposals'
import { RawApplication } from '../../../../src/mocks/data/seedApplications'

export const MEMBER_ALICE_DATA = {
  id: '0',
  rootAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
  controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  handle: 'alice',
  metadata: {
    name: 'animi et',
    about: 'Optio possimus...',
  },
  isVerified: true,
  isFoundingMember: true,
  inviteCount: 5,
  registeredAtBlockId: '1',
}

export const OPENING_DATA: RawOpeningMock = {
  id: 'forumWorkingGroup-1',
  runtimeId: 1,
  groupId: 'forumWorkingGroup',
  type: 'REGULAR',
  status: 'open',
  stakeAmount: 2000,
  metadata: {
    shortDescription: 'Distribution Worker',
    description: '# Description',
    hiringLimit: 1,
    expectedEnding: '2022-03-09T10:18:04.155Z',
    applicationDetails: 'Details... ?',
    applicationFormQuestions: [
      {
        type: 'TEXT',
        question: 'Question 1',
      },
      {
        type: 'TEXT',
        question: 'Question 2',
      },
      {
        type: 'TEXT',
        question: 'Question 3',
      },
    ],
  },
  unstakingPeriod: 14409,
  rewardPerBlock: 200,
}

export const UPCOMING_OPENING: RawUpcomingOpeningMock = {
  id: 'forumWorkingGroup-1',
  runtimeId: 1,
  groupId: 'forumWorkingGroup',
  stakeAmount: 5000,
  rewardPerBlock: 200,
  expectedStart: '2021-06-11T23:52:47.017Z',
  metadata: {
    shortDescription: 'Upcoming worker opening.officiis aliquam sapiente et quis sed',
    description: 'Description',
    hiringLimit: 1,
    applicationDetails: 'Eaque voluptate similique',
    applicationFormQuestions: [
      {
        type: 'TEXT',
        question: 'tempore a quas dicta qui voluptas delectus?',
      },
      {
        type: 'TEXTAREA',
        question: 'dolorem ad fuga ipsum sed?',
      },
    ],
    expectedEnding: '2021-07-04T14:01:59.513Z',
  },
}

export const WORKER_DATA: RawWorker = {
  id: 'forumWorkingGroup-1',
  runtimeId: 1,
  membershipId: 0,
  groupId: 'forumWorkingGroup',
  applicationId: 'forumWorkingGroup-1',
  nextPaymentAt: '',
  rewardPerBlock: 0,
  earnedTotal: 2000,
  stake: 4000,
  missingRewardAmount: 1000,
  status: '',
  createdAt: '2021-07-04T14:01:59.513Z',
}

export const APPLICATION_DATA: RawApplication = {
  id: 'forumWorkingGroup-1',
  runtimeId: 1,
  openingId: 'forumWorkingGroup-1',
  applicantId: '41',
  answers: [],
  status: 'pending',
}

export const PROPOSAL_DATA: ProposalMock = {
  id: '0',
  title: 'Rubber scalable functionalities dedicated',
  status: 'deciding',
  statusSetAtBlock: 0,
  statusSetAtTime: '2021-06-16T02:37:48.929Z',
  details: { type: 'updateWorkingGroupBudget' },
  creatorId: '0',
  createdAt: '2021-06-15T14:59:37.847Z',
  description:
    '# et quo quaerat optio\n\nLaudantium non molestias consequatur occaecati non officia. Eum eaque suscipit nam soluta. Nihil quia velit voluptatibus. Architecto nemo quis. Veniam beatae porro cum fugiat corrupti voluptatem quia.\n\n## odio dolorem impedit amet\n\nDolorem ut ipsam repellat repudiandae quia. Id animi sed et et a voluptas sit itaque. Magni nihil perferendis facilis. Animi eos vel ut.\n \rRepellat rerum rerum velit sint cupiditate. Qui et aliquam modi. Molestiae ad distinctio necessitatibus accusantium. Voluptatem blanditiis explicabo accusamus ut praesentium.',
  votes: ['APPROVE', 'APPROVE', 'SLASH'].map((voteKind) => ({ voteKind, id: '1' } as any)),
  createdInEvent: { inBlock: 0 },
  proposalStatusUpdates: [],
  discussionThread: { discussionPosts: [], mode: 'ProposalDiscussionThreadModeOpen' },
}
