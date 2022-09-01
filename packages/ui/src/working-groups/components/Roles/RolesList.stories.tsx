import { BN_TEN } from '@polkadot/util'
import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RolesList, RolesListProps } from '@/working-groups/components/Roles/RolesList'

export default {
  title: 'WorkingGroup/RolesList',
  component: RolesList,
} as Meta

const Template: Story<RolesListProps> = (args) => (
  <MockApolloProvider>
    <RolesList {...args} />
  </MockApolloProvider>
)

export const Default = Template.bind({})
Default.args = {
  workers: [
    {
      id: '0',
      runtimeId: 1,
      group: { id: 'forumWorkingGroup', name: 'forum' },
      membership: { id: '0', controllerAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY' },
      status: 'WorkerStatusActive',
      rewardPerBlock: BN_TEN,
      stake: new BN(1000),
      isLead: false,
      owedReward: new BN(1000),
    },
  ],
}
