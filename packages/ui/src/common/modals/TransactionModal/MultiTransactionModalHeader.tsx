import React from 'react'

import { ModalHeader } from '@/common/components/Modal'
import { TransactionStep } from '@/common/modals/TransactionModal/types'

type MultiTransactionModalHeaderParams = {
  onClick: () => void
  active: number
  transactionSteps: TransactionStep[]
}

export const MultiTransactionModalHeader = (props: MultiTransactionModalHeaderParams) => (
  <ModalHeader
    onClick={props.onClick}
    title={`Transaction ${props.active + 1} "${props.transactionSteps[props.active]?.title}"`}
  />
)
