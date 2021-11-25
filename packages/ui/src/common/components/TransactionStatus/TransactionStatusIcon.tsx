import React from 'react'
import styled from 'styled-components'

import { Colors } from '../../constants'
import { FailureSymbol, SuccessSymbol } from '../icons/symbols'
import { LoadingAnimation } from '../LoadingAnimation'

import { TransactionState } from './types'

export interface TransactionStatusStateProps {
  state: TransactionState
}

export const TransactionStatusIcon = ({ state }: TransactionStatusStateProps) => {
  switch (state) {
    case 'loading':
      return <LoadingAnimation />
    case 'pending':
      return <PendingAnimation />
    case 'successful':
      return <StatusSuccessSymbol />
    case 'failure':
      return <StatusFailureSymbol />
    default:
      return null
  }
}

const PendingAnimation = styled(LoadingAnimation)`
  .loading-stroke-1 {
    stroke: ${Colors.Orange[300]};
  }
  .loading-stroke-2 {
    stroke: ${Colors.Orange[500]};
  }
`
const StatusSuccessSymbol = styled(SuccessSymbol)`
  width: 24px;
  height: 24px;

  .blackPart,
  .primaryPart {
    fill: ${Colors.Green[500]};
  }
`

const StatusFailureSymbol = styled(FailureSymbol)`
  width: 24px;
  height: 24px;

  .blackPart,
  .primaryPart {
    fill: ${Colors.Red[500]};
  }
`
