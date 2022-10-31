import React from 'react'

import { BenefitListItem } from '@/app/components/OnboardingOverlay/components/BenefitListItem'
import { RowGapBlock } from '@/common/components/page/PageContent'

export const BenefitsTableLayout = '1fr 100px 100px'

export const BenefitsTable = () => {
  return (
    <RowGapBlock gap={10}>
      <BenefitListItem text="Join Working Groups" />
      <BenefitListItem text="Create Proposals" />
      <BenefitListItem text="Become a Council member" />
      <BenefitListItem text="Create threads on Forum" />
      <BenefitListItem text="Nominate or vote for candidates" />
    </RowGapBlock>
  )
}
