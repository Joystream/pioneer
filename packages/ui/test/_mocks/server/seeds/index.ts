import { RawOpeningMock, RawWorker } from '@/mocks/data'
import { RawApplication } from '@/mocks/data/mockApplications'
import { RawUpcomingOpeningMock } from '@/mocks/data/seedUpcomingOpening'

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
  groupId: '0',
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
  groupId: '0',
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
  id: '1',
  membershipId: 0,
  groupId: 'forumWorkingGroup',
  applicationId: 1,
  nextPaymentAt: '',
  rewardPerBlock: 0,
  earnedTotal: 2000,
  stake: 4000,
  missingRewardAmount: 1000,
  status: '',
}

export const APPLICATION_DATA: RawApplication = {
  openingId: '1',
  applicantId: '41',
  answers: [],
  status: 'pending',
}
