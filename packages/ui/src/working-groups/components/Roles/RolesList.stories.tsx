import { Meta, Story } from '@storybook/react'
import React from 'react'

import { RolesList, RolesListProps } from '@/working-groups/components/Roles/RolesList'
import { getReward } from '@/working-groups/model/getReward'

export default {
  title: 'WorkingGroup/RolesList',
  component: RolesList,
} as Meta

const Template: Story<RolesListProps> = (args) => <RolesList {...args} />

export const Default = Template.bind({})
Default.args = {
  workers: [
    {
      id: '0',
      group: { id: '0', name: 'forum' },
      membership: { id: '0', controllerAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY' },
      status: 'WorkerStatusActive',
      reward: getReward(1, 'forum'),
      earnedTotal: 1000,
      stake: 1000,
      minStake: 400,
      isLeader: false,
    },
  ],
}
