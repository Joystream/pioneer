import { Meta, Story } from '@storybook/react'
import React from 'react'

import { StakeStat, StakeStatProps } from '@/common/components/statistics/StakeStat'

import { TemplateBlock, WhiteBlock } from '../storybookParts/previewStyles'

export default {
  title: 'Common/StakeStat',
  component: StakeStat,
} as Meta

const Template: Story<StakeStatProps> = (args) => (
  <TemplateBlock>
    <WhiteBlock>
      <StakeStat {...args} />
    </WhiteBlock>
    <WhiteBlock>
      <StakeStat {...args} minStake={10000} />
    </WhiteBlock>
  </TemplateBlock>
)

export const Default = Template.bind({})

Default.args = {
  value: 1000,
  minStake: 1000,
}
