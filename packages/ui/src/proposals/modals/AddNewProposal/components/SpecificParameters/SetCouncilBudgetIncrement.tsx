import React from 'react'

import { CurrencyName } from '@/app/constants/currency'
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
          <TextMedium lighter>Tokens added to council budget every day</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="New Council Budget Increment Value"
            tight
            units={CurrencyName.integerValue}
            required
            name="setCouncilBudgetIncrement.amount"
            message="Value must be greater than zero"
          >
            <TokenInput id="amount-input" name="setCouncilBudgetIncrement.amount" placeholder="0" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
