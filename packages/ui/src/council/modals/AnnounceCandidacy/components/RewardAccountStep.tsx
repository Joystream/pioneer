import React from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'

export const RewardAccountStep = () => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Reward account</h4>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Select account receiving councilor rewards in case your candidacy is elected"
            name="reward.account"
            required
            inputSize="l"
          >
            <SelectAccount name="reward.account" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
