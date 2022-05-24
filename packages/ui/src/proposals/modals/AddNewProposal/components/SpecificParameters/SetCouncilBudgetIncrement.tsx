import BN from 'bn.js'
import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export interface SetCouncilBudgetIncrementParameters {
  amount?: BN
}

export const SetCouncilBudgetIncrement = () => {
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
            <InputNumber
              id="amount-input"
              isInBN
              name="setCouncilBudgetIncrement.amount"
              placeholder="0"
              maxAllowedValue={Math.pow(2, 128)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
