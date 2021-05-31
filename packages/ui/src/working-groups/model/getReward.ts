import BN from 'bn.js'

import { GroupName, GroupRewardPeriods, KnownWorkingGroups } from '../types'
import { Reward } from '../types/Reward'

export function getReward(rewardPerBlock: number, groupName: string): Reward {
  return KnownWorkingGroups.includes(groupName as GroupName)
    ? {
        payout: GroupRewardPeriods[groupName as GroupName].mul(new BN(rewardPerBlock)),
        blockInterval: GroupRewardPeriods[groupName as GroupName].toNumber(),
      }
    : {
        payout: new BN(7),
        blockInterval: 1,
      }
}
