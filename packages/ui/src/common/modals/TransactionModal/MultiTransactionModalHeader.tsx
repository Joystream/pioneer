import React from 'react'

import { ModalCustomContentHeader } from '@/common/components/Modal'
import { TransactionStep } from '@/common/modals/TransactionModal/types'

import { MultiTransactionStep } from './MultiTransactionStep'

type MultiTransactionModalHeaderParams = {
  onClick: () => void
  active: number
  transactionSteps: TransactionStep[]
}

export const MultiTransactionModalHeader = (props: MultiTransactionModalHeaderParams) => (
  <ModalCustomContentHeader onClick={props.onClick}>
    {props.transactionSteps.map((step, index) => (
      <MultiTransactionStep
        key={index}
        stepNumber={props.active + 1}
        stepTitle={props.transactionSteps[props.active]?.title}
        active={index == props.active + 1}
        past={false}
      />
    ))}
  </ModalCustomContentHeader>
)
