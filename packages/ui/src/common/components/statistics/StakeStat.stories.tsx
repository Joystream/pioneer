import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { StakeStat, StakeStatProps } from '@/common/components/statistics/StakeStat'

import { TemplateBlock, WhiteBlock } from '../storybookParts/previewStyles'

export default {
  title: 'Common/Statistics/StakeStat',
  component: StakeStat,
} as Meta

const Template: Story<StakeStatProps> = (args) => (
  <TemplateBlock>
    <WhiteBlock>
      <StakeStat {...args} />
    </WhiteBlock>
    <WhiteBlock>
      <StakeStat {...args} minStake={new BN(10000)} />
    </WhiteBlock>
  </TemplateBlock>
)

export const Default = Template.bind({})

Default.args = {
  value: new BN(1000),
  minStake: new BN(1000),
}
