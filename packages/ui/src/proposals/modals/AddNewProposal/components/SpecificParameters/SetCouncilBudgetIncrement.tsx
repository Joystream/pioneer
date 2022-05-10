import BN from 'bn.js'
import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export interface SetCouncilBudgetIncrementParameters {
  amount?: BN
}

interface Props extends SetCouncilBudgetIncrementParameters {
  setAmount: (amount: BN) => void
}

const MAX_AMOUNT = Math.pow(2, 128)

export const SetCouncilBudgetIncrement = ({ amount, setAmount: setBudgetIncrement }: Props) => {
  const onChange = (_: any, value: number) => {
    if (Number(value) < MAX_AMOUNT) {
      setBudgetIncrement(new BN(value))
    }
  }

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Council Budget Increment</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="New Council Budget Increment Value"
            tight
            units="tJOY"
            required
            message="Value must be greater than zero"
          >
            <InputNumber id="amount-input" value={amount?.toString()} placeholder="0" onChange={onChange} />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
