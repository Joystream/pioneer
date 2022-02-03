import { Meta, Story } from '@storybook/react'
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
  earnedValue: 1000,
  rewardValue: 2000,
}
