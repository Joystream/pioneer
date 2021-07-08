import BN from 'bn.js'
import { addSeconds, differenceInSeconds, format } from 'date-fns'

import { SECONDS_PER_BLOCK } from '../constants'

export function inBlocksDate(blocks: BN) {
  const maxSeconds = differenceInSeconds(new Date(2030, 0, 1), Date.now())
  const maxBlocks = Math.round(maxSeconds / SECONDS_PER_BLOCK)
  const inSeconds = (blocks.gten(maxBlocks) ? maxBlocks : blocks.toNumber()) * SECONDS_PER_BLOCK

  const blockDate = addSeconds(Date.now(), inSeconds)

  return format(blockDate, 'dd MMM yyyy, HH:mm')
}
