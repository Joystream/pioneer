import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export const SetEraPayoutDampingFactor = () => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set era payout damping factor</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            message={'Amount must be greater than zero'}
            id="damping-factor-input"
            name="setEraPayoutDampingFactor.dampingFactor"
            label="Damping factor"
            tight
            units="%"
            required
          >
            <InputNumber
              id="damping-factor-input"
              name="setEraPayoutDampingFactor.dampingFactor"
              maxAllowedValue={100}
              placeholder="0"
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
