import React from 'react'

import { NoData } from '@/common/components/NoData'
import { TextMedium } from '@/common/components/typography'

import { AddProposalButton } from '../AddProposalButton'

export const NoProposals = () => (
  <NoData>
    <h3>There are no current proposals yet</h3>
    <TextMedium>
      The proposal system is the way changes to the platform state and policy are suggested, discussed, voted on by the
      council, and finalized as accepted or rejected.
    </TextMedium>
    <AddProposalButton />
  </NoData>
)
