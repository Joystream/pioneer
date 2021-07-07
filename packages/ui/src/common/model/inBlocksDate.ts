import BN from 'bn.js'
import { addSeconds, format } from 'date-fns'

import { SECONDS_PER_BLOCK } from '../constants'

export function inBlocksDate(blocks: BN) {
  const inSeconds = blocks.toNumber() * SECONDS_PER_BLOCK

  const blockDate = addSeconds(Date.now(), inSeconds)

  return format(blockDate, 'dd MMM yyyy, HH:mm')
}
