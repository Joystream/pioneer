import BN from 'bn.js'

import { A_WEEK } from '@/common/constants'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'

export const asWeeklyRewards = (rewardPerBlock: BN) => {
  const BLOCKS_PER_WEEK = A_WEEK / MILLISECONDS_PER_BLOCK
  return rewardPerBlock.muln(BLOCKS_PER_WEEK)
}
