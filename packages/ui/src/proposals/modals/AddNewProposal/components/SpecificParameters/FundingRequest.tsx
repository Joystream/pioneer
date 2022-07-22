import React from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export const FundingRequest = () => {
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
          <InputComponent
            label="Amount"
            tight
            units="tJOY"
            required
            message="Amount must be greater than zero"
            name="fundingRequest.amount"
          >
            <TokenInput id="amount-input" isTokenValue placeholder="0" isInBN name="fundingRequest.amount" />
          </InputComponent>
          <InputComponent label="Recipient account" required inputSize="l">
            <SelectAccount name="fundingRequest.account" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
