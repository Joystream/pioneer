import BN from 'bn.js'

import { GroupRewardPeriods, isKnownGroupName } from '../types'
import { Reward } from '../types/Reward'

export function getReward(rewardPerBlock: number, groupName: string): Reward {
  if (isKnownGroupName(groupName)) {
    return {
      payout: GroupRewardPeriods[groupName].mul(new BN(rewardPerBlock)),
      blockInterval: GroupRewardPeriods[groupName].toNumber(),
    }
  }

  return {
    payout: new BN(rewardPerBlock),
    blockInterval: 1,
  }
}
