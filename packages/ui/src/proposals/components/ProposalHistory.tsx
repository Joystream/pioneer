import React, { useMemo } from 'react'

import { BlockTime } from '@/common/components/BlockTime'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Stepper, StepperStep } from '@/common/components/Stepper'
import { Label } from '@/common/components/typography'
import { proposalActiveStatuses } from '@/proposals/model/proposalStatus'
import { ProposalWithDetails } from '@/proposals/types'

interface ProposalHistoryProps {
  proposal: ProposalWithDetails
}

export const ProposalHistory = ({ proposal }: ProposalHistoryProps) => {
  const history = useMemo((): StepperStep[] => {
    const updates = proposal.proposalStatusUpdates
    const createdStatus = { status: 'Created', createdAt: proposal.createdAt, inBlock: proposal.createdInBlock }
    const decidingStatus = { status: 'Deciding', createdAt: proposal.createdAt, inBlock: proposal.createdInBlock }
    const endStatus = !proposalActiveStatuses.includes(proposal.status) && [
      { status: proposal.status, createdAt: proposal.statusSetAtTime, inBlock: proposal.statusSetAtBlock },
    ]
    const steps = [createdStatus, decidingStatus, ...updates, ...(endStatus || [])]

    return steps.map(({ status, inBlock }, index) => ({
      title: status,
      type: index === steps.length - 1 ? 'active' : 'past',
      details: <BlockTime block={inBlock} layout="reverse-start" lessInfo />,
    }))
  }, [proposal.id])

  return (
    <RowGapBlock gap={16}>
      <Label>History</Label>
      <Stepper theme="light" steps={history} />
    </RowGapBlock>
  )
}
