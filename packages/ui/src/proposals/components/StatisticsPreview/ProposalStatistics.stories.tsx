import { Meta, StoryObj } from '@storybook/react'
import React, { FC } from 'react'

import { percentageControl, voteControl } from '@/common/components/storybookParts/previewStyles'
import { ProposalConstants } from '@/proposals/types'

import { ProposalStatistics } from './ProposalStatistics'

export default {
  title: 'Pages/Proposals/ProposalPreview/Components/ProposalStatistics',
  component: ProposalStatistics,
  argTypes: {
    approve: voteControl,
    reject: voteControl,
    slash: voteControl,
    abstain: voteControl,
    councilSize: { control: { type: 'range', min: 0, max: 20 } },
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
  unknownConstants: boolean
  approvalQuorumPercentage: number
  approvalThresholdPercentage: number
  slashingQuorumPercentage: number
  slashingThresholdPercentage: number
}

export const Default: StoryObj<FC<Args>> = {
  name: 'ProposalStatistics',

  args: {
    approve: 2,
    reject: 2,
    slash: 0,
    abstain: 3,
    councilSize: 20,
    unknownConstants: false,
    approvalQuorumPercentage: 30,
    approvalThresholdPercentage: 51,
    slashingQuorumPercentage: 10,
    slashingThresholdPercentage: 10,
  },

  render: ({
    approve = 0,
    reject = 0,
    slash = 0,
    abstain = 0,
    councilSize,
    unknownConstants,
    approvalQuorumPercentage,
    approvalThresholdPercentage,
    slashingQuorumPercentage,
    slashingThresholdPercentage,
  }) => {
    const constants = unknownConstants
      ? null
      : ({
          approvalQuorumPercentage,
          approvalThresholdPercentage,
          slashingQuorumPercentage,
          slashingThresholdPercentage,
        } as ProposalConstants)

    const total = approve + slash + reject + abstain
    const remain = councilSize ? councilSize - total : undefined

    return <ProposalStatistics constants={constants} voteCount={{ approve, slash, reject, abstain, total, remain }} />
  },
}
