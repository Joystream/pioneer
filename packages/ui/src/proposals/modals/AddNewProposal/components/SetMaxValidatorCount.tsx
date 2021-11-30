import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

export interface SetMaxValidatorCountParameters {
  validatorCount?: BN
}

interface SetMaxValidatorCountProps {
  validatorCount?: BN
  setValidatorCount: (validatorCount: BN) => void
}

export const SetMaxValidatorCount = ({
  validatorCount: maxValidatorCount,
  setValidatorCount: setValidator,
}: SetMaxValidatorCountProps) => {
  const [validatorCount, setValidatorCount] = useNumberInput(0, maxValidatorCount)

  useEffect(() => {
    setValidator(new BN(validatorCount))
  }, [validatorCount])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set max validator count</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Amount" tight units="JOY" required>
            <InputNumber
              id="amount-input"
              value={formatTokenValue(new BN(validatorCount))}
              placeholder="0"
              onChange={(event) => setValidatorCount(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
