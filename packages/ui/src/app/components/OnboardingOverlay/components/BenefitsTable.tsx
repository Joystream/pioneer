import React from 'react'

import { BenefitListItem } from '@/app/components/OnboardingOverlay/components/BenefitListItem'
import { List } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'

export const BenefitsTableLayout = '1fr 100px 100px'

export const BenefitsTable = () => {
  return (
    <RowGapBlock gap={4}>
      <List>
        <BenefitListItem text="Join Working Groups" />
        <BenefitListItem text="Create Proposals" />
        <BenefitListItem text="Nominate or vote for candidates" />
        <BenefitListItem text="Become a Council member" />
        <BenefitListItem text="Create threads on Forum" />
      </List>
    </RowGapBlock>
  )
}

// const BenefitsTableHeader = styled(ListHeader)`
//   color: ${Colors.White};
//   font-weight: 700;
//   justify-self: center;
//   font-size: 14px;
//   text-transform: none;
// `

// const BenefitsTableHeaders = styled(ListHeaders)`
//   margin-bottom: 24px;
// `
