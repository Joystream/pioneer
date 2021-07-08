import BN from 'bn.js'
import { addSeconds, format } from 'date-fns'

import { getMaxBlock } from '@/common/model/getMaxBlock'

import { SECONDS_PER_BLOCK } from '../constants'

export function inBlocksDate(blocks: BN) {
  const inBlocks = blocks.gte(getMaxBlock()) ? getMaxBlock().toNumber() : blocks.toNumber()
  const inSeconds = inBlocks * SECONDS_PER_BLOCK

  const blockDate = addSeconds(Date.now(), inSeconds)

  return format(blockDate, 'dd MMM yyyy, HH:mm')
}
