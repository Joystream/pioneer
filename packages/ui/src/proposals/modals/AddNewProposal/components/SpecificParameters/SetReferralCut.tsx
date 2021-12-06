import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

export interface SetReferralCutParameters {
  amount?: BN
}

interface Props extends SetReferralCutParameters {
  setAmount: (amount: BN) => void
}

export const SetReferralCut = ({ amount: cutAmount, setAmount: setCutAmount }: Props) => {
  const [amount, setAmount] = useNumberInput(0, cutAmount)

  useEffect(() => {
    setCutAmount(new BN(amount))
  }, [amount])

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
          <TextMedium lighter>Set Referral Cut</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Referral Cut"
            tight
            units="JOY"
            message="Maximal value for referral is 255 JOY"
            required
          >
            <InputNumber id="amount-input" value={formatTokenValue(amount)} placeholder="0" onChange={onChange} />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
