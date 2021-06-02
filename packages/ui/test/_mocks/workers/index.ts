import { getReward } from '@/working-groups/model/getReward'

import { alice } from '../keyring'

export const getDefaultWorker = (asMock?: true) => {
  if (!asMock) {
    return {
      id: '0',
      membership: {
        id: '0',
        controllerAccount: alice.address,
      },
      group: {
        name: 'forum',
        id: '0',
      },
      isLeader: false,
      reward: getReward(2, 'forum'),
      earnedTotal: 2000,
      stake: 2000,
      minStake: 2000,
      status: 'WorkerStatusActive',
    }
  }

  return {
    id: '0',
    membershipId: '0',
    groupId: 0,
    applicationId: '0',
    status: 'active',
    rewardPerBlock: 200,
    earnedTotal: 3800,
    stake: 2000,
    nextPaymentAt: '2021-05-24T07:57:32.894Z',
    hiredAtBlockId: '90',
  }
}
