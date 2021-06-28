import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { percentageControl, voteControl } from '@/common/components/storybookParts/previewStyles'
import { ProposalConstants } from '@/proposals/types'

import { ProposalStatistics } from './ProposalStatistics'

export default {
  title: 'Proposals/ProposalStatistics',
  component: ProposalStatistics,
  argTypes: {
    approve: voteControl,
    reject: voteControl,
    slash: voteControl,
    councilSize: { control: { type: 'range', min: 10, max: 40 } },
    approvalQuorumPercentage: percentageControl,
    approvalThresholdPercentage: percentageControl,
    slashingQuorumPercentage: percentageControl,
    slashingThresholdPercentage: percentageControl,
  },
} as Meta

interface Args {
  approve: number
  reject: number
  slash: number
  abstain: number
  councilSize: number
  approvalQuorumPercentage: number
  approvalThresholdPercentage: number
  slashingQuorumPercentage: number
  slashingThresholdPercentage: number
}

export const Default: Story<Args> = ({
  approve = 0,
  reject = 0,
  slash = 0,
  abstain = 0,
  councilSize,
  approvalQuorumPercentage,
  approvalThresholdPercentage,
  slashingQuorumPercentage,
  slashingThresholdPercentage,
}) => {
  const total = approve + slash + reject + abstain
  const remain = councilSize - total

  return (
    <MemoryRouter>
      <ProposalStatistics
        constants={
          {
            approvalQuorumPercentage,
            approvalThresholdPercentage,
            slashingQuorumPercentage,
            slashingThresholdPercentage,
          } as ProposalConstants
        }
        voteCount={{ approve, slash, reject, abstain, total, remain }}
      />
    </MemoryRouter>
  )
}

Default.args = {
  approve: 2,
  reject: 2,
  slash: 0,
  councilSize: 20,
  approvalQuorumPercentage: 30,
  approvalThresholdPercentage: 51,
  slashingQuorumPercentage: 10,
  slashingThresholdPercentage: 10,
}
