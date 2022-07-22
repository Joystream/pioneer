import React from 'react'

import { InputComponent, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export const MAX_VALIDATOR_COUNT = 300

export const SetMaxValidatorCount = () => {
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
          <InputComponent
            message={'Amount must be greater than zero'}
            name="setMaxValidatorCount.validatorCount"
            label="Amount"
            tight
            units="tJOY"
            required
          >
            <TokenInput
              id="amount-input"
              name="setMaxValidatorCount.validatorCount"
              isTokenValue
              isInBN
              placeholder="0"
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
