import BN from 'bn.js'
import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export interface SetInitialInvitationBalanceParameters {
  amount?: BN
}

interface FundingRequestProps extends SetInitialInvitationBalanceParameters {
  setAmount: (amount: BN) => void
}

export const SetInitialInvitationBalance = ({ setAmount, amount }: FundingRequestProps) => {
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
          <InputComponent label="Invitation Balance" tight units="JOY" required>
            <InputNumber
              id="amount-input"
              isTokenValue
              value={amount?.toString()}
              placeholder="0"
              onChange={(_, value) => setAmount(new BN(value))}
            />
          </InputComponent>
          <Row>
            <TextMedium lighter>The current balance is {currentBalance?.toString()} JOY.</TextMedium>
          </Row>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
