import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock, ModalBlock, WhiteBlock } from '@/common/components/storybookParts/previewStyles'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { randomBlock } from '@/mocks/helpers/randomBlock'
import { getReward } from '@/working-groups/model/getReward'

import { MemberRoleToggle, MemberRoleToggleProps } from './MemberRoleToggle'

export default {
  title: 'Member/MemberRoleToggle',
  component: MemberRoleToggle,
} as Meta

const Template: Story<MemberRoleToggleProps> = (args) => (
  <MockApolloProvider>
    <TemplateBlock>
      <ModalBlock>
        <MemberRoleToggle {...args} />
      </ModalBlock>
      <WhiteBlock>
        <MemberRoleToggle {...args} />
      </WhiteBlock>
    </TemplateBlock>
  </MockApolloProvider>
)

export const Default = Template.bind({})
Default.args = {
  role: {
    id: '123',
    runtimeId: 12,
    group: { id: '3', name: 'membership' },
    isLead: false,
    membership: { id: '0', controllerAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY' },
    reward: getReward(2, 'membership'),
    stake: 192837021,
    owedReward: 1000,
    minStake: 400,
    roleAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    stakeAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    hiredAtBlock: {
      ...randomBlock(),
    },
    applicationId: '0',
    openingId: '0',
    status: 'WorkerStatusActive',
  },
}
