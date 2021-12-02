import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { cleanInputValue, useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

export interface SetCouncilBudgetIncrementParameters {
  amount?: BN
}

interface Props extends SetCouncilBudgetIncrementParameters {
  setAmount: (amount: BN) => void
}

const MAX_AMOUNT = Math.pow(2, 128)

export const SetCouncilBudgetIncrement = ({ amount: initialAmount, setAmount: setBudgetIncrement }: Props) => {
  const [amount, setAmount] = useNumberInput(0, initialAmount)

  useEffect(() => {
    setBudgetIncrement(new BN(amount))
  }, [amount])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = cleanInputValue(e.target.value)
    if (Number(value) < MAX_AMOUNT) {
      setAmount(value)
    }
  }

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Council Budget Increment</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="New Council Budget Increment Value" tight units="JOY" required>
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
