import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

export interface SetMembershipPriceParameters {
  amount?: BN
}

interface Props extends SetMembershipPriceParameters {
  setAmount: (amount: BN) => void
}

export const SetMembershipPrice = ({ amount: price, setAmount: setPrice }: Props) => {
  const [amount, setAmount] = useNumberInput(0, price)

  useEffect(() => setPrice(new BN(amount)), [amount])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    if (Number(value) > 255) return

    setAmount(value)
  }

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
          <InputComponent label="Membership price" tight units="JOY" required>
            <InputNumber
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              placeholder="0"
              onChange={onChange}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
