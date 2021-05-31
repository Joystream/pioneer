import BN from 'bn.js'

import { GroupName, GroupRewardPeriods } from '../types'
import { Reward } from '../types/Reward'

export function getReward(rewardPerBlock: number, groupName: string): Reward {
  return {
    payout: GroupRewardPeriods[groupName as GroupName].mul(new BN(rewardPerBlock)),
    blockInterval: GroupRewardPeriods[groupName as GroupName].toNumber(),
  }
}
