import React from 'react'
import { TransferIcon, ArrowOutsideIcon, ArrowInsideIcon } from '.'

export const TransferIcons = {
  TransferIcon: <TransferIcon />,
  SendIcon: <ArrowOutsideIcon />,
  ReceiveIcon: <ArrowInsideIcon />,
}

export type TransferIconName = keyof typeof TransferIcons
