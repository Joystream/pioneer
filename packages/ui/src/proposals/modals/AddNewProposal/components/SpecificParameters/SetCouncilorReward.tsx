import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

export interface SetCouncilBudgetIncrementParameters {
  amount?: BN
}

interface Props extends SetCouncilBudgetIncrementParameters {
  setAmount: (amount: BN) => void
}

export const SetCouncilorReward = ({ amount: initialAmount, setAmount: setCouncilorReward }: Props) => {
  const [amount, setAmount] = useNumberInput(0, initialAmount)

  useEffect(() => {
    setCouncilorReward(new BN(amount))
  }, [amount])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Councilor Reward</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="New Councilor Reward" tight units="JOY" required>
            <InputNumber
              id="amount-input"
              value={formatTokenValue(amount)}
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
