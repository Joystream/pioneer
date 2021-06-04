import { RawUpcomingOpeningMock } from '@/mocks/data/seedUpcomingOpening'
import { getReward } from '@/working-groups/model/getReward'
import { WorkerWithDetails } from '@/working-groups/types'

import { alice } from '../../keyring'

export const MEMBER_ALICE = {
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

export const WORKER: WorkerWithDetails = {
  membership: {
    id: '1',
    controllerAccount: alice.address,
  },
  group: {
    name: 'forum',
    id: '1',
  },
  isLeader: false,
  reward: getReward(2, 'forum'),
  earnedTotal: 2000,
  stake: 2000,
  status: '',
  id: '1',
  applicationId: '1',
  openingId: '1',
  roleAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  stakeAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  rewardAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  hiredAtBlock: {
    id: '100',
    network: 'OLYMPIA',
    number: 100,
    timestamp: '2021-06-01T06:42:00.155Z',
  },
}

export const OPENING = {
  groupId: '0',
  type: 'REGULAR',
  status: 'open',
  stakeAmount: 2000,
  applications: null,
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
  unstakingPeriod: '14409',
  rewardPerBlock: 200,
  createdAtBlockId: '5',
}

export const UPCOMING_OPENING: RawUpcomingOpeningMock = {
  groupId: '0',
  stakeAmount: 5000,
  rewardPerBlock: 200,
  createdAtBlockId: '70',
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
