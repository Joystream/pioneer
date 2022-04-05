import BN from 'bn.js'
import React from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

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

export const FundingRequest = ({ amount, account, setAmount, setAccount }: FundingRequestProps) => {
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
          <InputComponent label="Amount" tight units="tJOY" required message="Amount must be greater than zero">
            <InputNumber
              id="amount-input"
              isTokenValue
              value={amount?.toString()}
              placeholder="0"
              onChange={(_, value) => setAmount(new BN(value))}
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
