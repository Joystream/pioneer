import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock, ModalBlock, WhiteBlock } from '@/common/components/storybookParts/previewStyles'

import { MemberRoleToggle, Props as MemberRoleToggleProps } from './MemberRoleToggle'

export default {
  title: 'Member/MemberRoleToggle',
  component: MemberRoleToggle,
} as Meta

const Template: Story<MemberRoleToggleProps> = (args) => (
  <TemplateBlock>
    <ModalBlock>
      <MemberRoleToggle {...args} />
    </ModalBlock>
    <WhiteBlock>
      <MemberRoleToggle {...args} />
    </WhiteBlock>
  </TemplateBlock>
)

export const Default = Template.bind({})
Default.args = {
  role: {
    earnedTotal: 1000,
    group: { id: '3', name: 'membership' },
    isLeader: false,
    membership: { id: '0' },
    rewardPerBlock: 13923,
    stake: 192837021,
    status: 'WorkerStatusActive',
  },
}
