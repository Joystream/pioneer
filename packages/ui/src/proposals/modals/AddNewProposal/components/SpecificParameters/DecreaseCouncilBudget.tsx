import React from 'react'

import { CurrencyName } from '@/app/constants/currency'
import { TokenInput, TokenInputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export const DecreaseCouncilBudget = () => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Decrease Council Budget</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <TokenInputComponent
            label="Amount"
            tight
            units={CurrencyName.integerValue}
            required
            message="Value must be greater than zero"
            name="decreaseCouncilBudget.amount"
            id="amount-input"
          >
            <TokenInput id="amount-input" name="decreaseCouncilBudget.amount" placeholder="0" />
          </TokenInputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
