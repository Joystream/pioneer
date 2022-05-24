import BN from 'bn.js'
import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { ValidationHelpers } from '@/common/utils/validation'

export interface SetMaxValidatorCountParameters {
  validatorCount?: BN
}

export const MAX_VALIDATOR_COUNT = 300

export const SetMaxValidatorCount = ({ errorChecker, errorMessageGetter }: ValidationHelpers) => {
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
            validation={errorChecker('amount') ? 'invalid' : undefined}
            message={
              (errorChecker('amount') ? errorMessageGetter('amount') : undefined) || 'Amount must be greater than zero'
            }
            label="Amount"
            tight
            units="tJOY"
            required
          >
            <InputNumber
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
