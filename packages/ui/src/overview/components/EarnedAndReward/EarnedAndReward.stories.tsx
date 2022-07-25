import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { EarnedAndReward, EarnedAndRewardProps } from '@/overview/components/EarnedAndReward/EarnedAndReward'

export default {
  title: 'Overview/EarnedAndReward',
  component: EarnedAndReward,
} as Meta

const Template: Story<EarnedAndRewardProps> = (args) => {
  return (
    <TemplateBlock>
      <EarnedAndReward {...args} />
    </TemplateBlock>
  )
}
export const Default = Template.bind({})
Default.args = {
  earnedTitle: 'Total earned this month',
  rewardTitle: 'Total owed reward this month',
  earnedValue: new BN(1000),
  rewardValue: new BN(2000),
}
