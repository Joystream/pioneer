import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { StakingPolicyAndReward as StakingPolicyAndReward_ } from '@/working-groups/components/CreateOpening/StakingPolicyAndReward'

export const StakingPolicyAndReward = () => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <StakingPolicyAndReward_ />
      </Row>
    </RowGapBlock>
  )
}
