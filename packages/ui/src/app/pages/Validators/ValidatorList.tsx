import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Statistics } from '@/common/components/statistics'
import { Era } from '@/validators/components/statistics/Era'
import { Rewards } from '@/validators/components/statistics/Rewards'
import { Staking } from '@/validators/components/statistics/Staking'
import { ValidatorsState } from '@/validators/components/statistics/ValidatorsState'

export const ValidatorList = () => {
  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <Statistics>
            <ValidatorsState />
            <Staking />
            <Era />
            <Rewards />
          </Statistics>
        </RowGapBlock>
      }
      main={<></>}
    />
  )
}
