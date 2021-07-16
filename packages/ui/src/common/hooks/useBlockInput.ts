import BN from 'bn.js'
import { useState } from 'react'

import { BN_ZERO } from '@/common/constants'

export const useBlockInput = (min: number, max: number, initial = BN_ZERO) => {
  const [block, setBlock] = useState(initial)

  const updateBlock = (value: string) => {
    const number = parseInt(value)

    if (Number.isNaN(number)) {
      return setBlock(BN_ZERO)
    }

    const trimmedToMinMax = Math.min(Math.max(number, min), max)

    const newBlock = new BN(trimmedToMinMax)

    if (newBlock.eq(block)) {
      return
    }

    setBlock(newBlock)
  }

  return [block, updateBlock] as const
}
