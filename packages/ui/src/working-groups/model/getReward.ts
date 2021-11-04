import BN from 'bn.js'

import { GroupIdName, GroupRewardPeriods } from '../types'
import { Reward } from '../types/Reward'

export function getReward(rewardPerBlock: number, groupName: GroupIdName): Reward {
  return {
    payout: GroupRewardPeriods[groupName].mul(new BN(rewardPerBlock)),
    blockInterval: GroupRewardPeriods[groupName].toNumber(),
  }
}
