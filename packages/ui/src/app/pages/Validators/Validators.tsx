import React, { useEffect } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { ValidatorsTabs } from './components/ValidatorsTabs'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { useModal } from '@/common/hooks/useModal'
import { Statistics } from '@/common/components/statistics'
import { ValidatorsState } from '@/validators/components/widgets/ValidatorsState'
import { Era } from '@/validators/components/widgets/Era'
import { Staking } from '@/validators/components/widgets/Staking'
import { Rewards } from '@/validators/components/widgets/Rewards'

export const Validators = () => {
  const id = 'dd'
  /* const { showModal } = useModal()
  useEffect(() => {
    showModal({ modal: 'Wait', data: { id } })
  }, []) */

  return (
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
      main={<MainPanel></MainPanel>}
    />
  )
}
