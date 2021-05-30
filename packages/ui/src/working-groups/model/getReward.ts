import BN from 'bn.js'

import { GroupName, GroupRewardPeriods } from '../types'

export function getReward(rewardPerBlock: number, groupName: string) {
  return {
    value: GroupRewardPeriods[groupName as GroupName].mul(new BN(rewardPerBlock)),
    interval: GroupRewardPeriods[groupName as GroupName].toNumber(),
  }
}
