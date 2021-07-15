import BN from 'bn.js'
import React, { useEffect } from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

export interface FundingRequestParameters {
  amount?: BN
  account?: Account
}

interface FundingRequestProps {
  amount?: BN
  setAmount: (amount: BN) => void
  account?: Account
  setAccount: (account: Account) => void
}

export const FundingRequest = ({
  amount: initialAmount,
  account,
  setAmount: saveAmount,
  setAccount,
}: FundingRequestProps) => {
  const [amount, setAmount] = useNumberInput(0, initialAmount ? initialAmount.toNumber() : undefined)

  useEffect(() => {
    saveAmount(new BN(amount))
  }, [amount])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Funding Request</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Amount" tight units="JOY" required>
            <InputNumber
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
          <InputComponent label="Recipient account" required inputSize="l">
            <SelectAccount onChange={(account) => setAccount(account)} selected={account} />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
