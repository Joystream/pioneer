import React from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Statistics } from '@/common/components/statistics'
import { Era } from '@/validators/components/statistics/Era'
import { Rewards } from '@/validators/components/statistics/Rewards'
import { Staking } from '@/validators/components/statistics/Staking'
import { ValidatorsState } from '@/validators/components/statistics/ValidatorsState'
import { ValidatorsInfo } from '@/validators/modals/ValidatorsInfo'

import { ValidatorsTabs } from './components/ValidatorsTabs'
export const Validators = () => {
  return (
    <>
      <PageLayout
        header={
          <RowGapBlock gap={24}>
            <PageHeader title="Validators" tabs={<ValidatorsTabs />} />
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
      <ValidatorsInfo />
    </>
  )
}
