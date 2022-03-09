import BN from 'bn.js'
import { addSeconds, format } from 'date-fns'

import { getMaxBlock } from '@/common/model/getMaxBlock'

import { SECONDS_PER_BLOCK } from '../constants'

export function inBlocksDate(blocks: BN | number) {
  const inBlocks = Math.min(Number(getMaxBlock()), Number(blocks))
  const inSeconds = inBlocks * SECONDS_PER_BLOCK

  const blockDate = addSeconds(Date.now(), inSeconds)

  return format(blockDate, 'dd MMM yyyy, HH:mm')
}
