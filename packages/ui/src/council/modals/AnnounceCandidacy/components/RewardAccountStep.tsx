import React from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useResponsive } from '@/common/hooks/useResponsive'

export const RewardAccountStep = () => {
  const { isMobile, size } = useResponsive()
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
            inputSize={isMobile ? 'xxl' : 'l'}
          >
            <SelectAccount name="reward.account" variant={isMobile ? 's' : size === 'md' ? 'm' : 'l'} />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
