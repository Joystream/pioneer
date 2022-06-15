import React from 'react'

import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const SetInitialInvitationBalance = () => {
  const { api } = useApi()
  const currentBalance = useObservable(api?.query.members.initialInvitationBalance(), [])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Initial Invitation Balance</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={12}>
          <InputComponent
            name="setInitialInvitationBalance.amount"
            label="Invitation Balance"
            tight
            units={CurrencyName.integerValue}
            required
          >
            <InputNumber
              id="amount-input"
              name="setInitialInvitationBalance.amount"
              isTokenValue
              isInBN
              placeholder="0"
            />
          </InputComponent>
          <Row>
            <TextMedium lighter>
              The current balance is {currentBalance?.toString()} {CurrencyName.integerValue}.
            </TextMedium>
          </Row>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
