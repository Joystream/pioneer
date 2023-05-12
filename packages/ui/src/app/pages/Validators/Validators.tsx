import React from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { ValidatorsTabs } from './components/ValidatorsTabs'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { Statistics } from '@/common/components/statistics'
import { ValidatorsState } from '@/validators/components/widgets/ValidatorsState'
import { Era } from '@/validators/components/widgets/Era'
import { Staking } from '@/validators/components/widgets/Staking'
import { Rewards } from '@/validators/components/widgets/Rewards'
import { ValidatorsInfo } from '@/validators/modals/ValidatorsInfo'
import { ValidatorsListFilter } from '@/validators/components/ValidatorsListFilter'

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
            <ValidatorsListFilter />
          </RowGapBlock>
        }
        main={
          <MainPanel>
          </MainPanel>
        }
      />
      <ValidatorsInfo />
    </>
  )
}

