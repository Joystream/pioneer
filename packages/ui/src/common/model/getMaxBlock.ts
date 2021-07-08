import BN from 'bn.js'
import { differenceInSeconds } from 'date-fns'

import { SECONDS_PER_BLOCK } from '@/common/constants'
import { getMaxDate } from '@/common/model/getMaxDate'

export const getMaxBlock = (currentBlock?: BN) => {
  const inBlocks = new BN(Math.floor(differenceInSeconds(getMaxDate(), Date.now()) / SECONDS_PER_BLOCK))

  return currentBlock ? currentBlock.add(inBlocks) : inBlocks
}
