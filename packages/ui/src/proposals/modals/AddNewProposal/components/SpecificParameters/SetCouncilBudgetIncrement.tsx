import React from 'react'

import { InputComponent, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

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
            name="setCouncilBudgetIncrement.amount"
            message="Value must be greater than zero"
          >
            <TokenInput
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
