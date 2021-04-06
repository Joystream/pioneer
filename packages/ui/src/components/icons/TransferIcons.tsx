import React from 'react'

import { TransferIcon, ArrowOutsideIcon, ArrowInsideIcon } from '.'

interface Props {
  type: TransferType
}

export function PickedTransferIcon({ type }: Props) {
  switch (type) {
    case 'transfer':
      return <TransferIcon />
    case 'send':
      return <ArrowOutsideIcon />
    case 'receive':
      return <ArrowInsideIcon />
    default:
      return null
  }
}

export type TransferType = 'send' | 'receive' | 'transfer'
