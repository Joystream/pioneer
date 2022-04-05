import BN from 'bn.js'
import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export interface SetMembershipPriceParameters {
  amount?: BN
}

interface Props extends SetMembershipPriceParameters {
  setAmount: (amount: BN) => void
}

export const SetMembershipPrice = ({ amount, setAmount }: Props) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Membership price</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Membership price"
            tight
            units="tJOY"
            required
            message="Value must be greater than zero"
          >
            <InputNumber
              id="amount-input"
              isTokenValue
              value={amount?.toString()}
              placeholder="0"
              onChange={(_, value) => setAmount(new BN(value))}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
