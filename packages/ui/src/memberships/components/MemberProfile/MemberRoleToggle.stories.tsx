import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock, ModalBlock, WhiteBlock } from '@/common/components/storybookParts/previewStyles'
import { getReward } from '@/working-groups/model/getReward'

import { MemberRoleToggle, MemberRoleToggleProps } from './MemberRoleToggle'

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
    id: '123',
    earnedTotal: 1000,
    group: { id: '3', name: 'membership' },
    isLeader: false,
    membership: { id: '0', controllerAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY' },
    reward: getReward(2, 'membership'),
    stake: 192837021,
    minStake: 400,
    roleAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    stakeAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    hiredAtBlock: {
      id: '35',
      network: 'OLYMPIA',
      number: 1034,
      timestamp: '2021-05-13T13:50:23.694Z',
    },
    applicationId: '0',
    openingId: '0',
    status: 'WorkerStatusActive',
  },
}
