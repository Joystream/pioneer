import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { TokenInput, TokenInputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

export const DecreaseCouncilBudget = () => {
  const { api } = useApi()
  const current = useFirstObservableValue(() => api?.query.council.budget(), [api?.isConnected])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>
            Decrease Council Budget.
            {current && (
              <>
                {' '}
                The current budget is <TokenValue value={current} />.
              </>
            )}
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <TokenInputComponent
            label="Decrease budget by"
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
