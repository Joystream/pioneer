import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { useObservable } from '@/common/hooks/useObservable'
import { formatTokenValue } from '@/common/model/formatters'

export interface SetInitialInvitationBalanceParameters {
  amount?: BN
}

interface FundingRequestProps {
  setAmount: (amount: BN) => void
}

export const SetInitialInvitationBalance = ({ setAmount: saveAmount }: FundingRequestProps) => {
  const [amount, setAmount] = useNumberInput(0)
  const { api } = useApi()
  const currentBalance = useObservable(api?.query.members.initialInvitationBalance(), [])

  useEffect(() => {
    saveAmount(new BN(amount))
  }, [amount])

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
              value={formatTokenValue(new BN(amount))}
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
          <Row>
            <TextMedium lighter>The current balance is {currentBalance?.toString} JOY.</TextMedium>
          </Row>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
