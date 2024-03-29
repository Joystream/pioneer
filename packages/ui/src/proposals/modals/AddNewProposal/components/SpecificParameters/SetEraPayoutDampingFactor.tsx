import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

export const SetEraPayoutDampingFactor = () => {
  const { api } = useApi()
  const current = useFirstObservableValue(() => api?.query.council.eraPayoutDampingFactor(), [api?.isConnected])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>
            Set the validator reward multiplier. {current && `The current value is ${current.toNumber()}%`}.
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            message={'Amount must be greater than zero'}
            id="damping-factor-input"
            name="setEraPayoutDampingFactor.dampingFactor"
            label="Validator reward multiplier"
            tight
            units="%"
            required
          >
            <InputNumber id="damping-factor-input" name="setEraPayoutDampingFactor.dampingFactor" placeholder="100" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
