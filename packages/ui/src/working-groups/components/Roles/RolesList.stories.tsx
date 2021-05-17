import { Meta, Story } from '@storybook/react'
import React from 'react'

import { RolesList, RolesListProps } from '@/working-groups/components/Roles/RolesList'

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
      membership: { id: '0' },
      status: 'WorkerStatusActive',
      rewardPerBlock: 100,
      earnedTotal: 1000,
      stake: 1000,
      isLeader: false,
      roleAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      stakeAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      hiredAtBlock: {
        id: '66',
        network: 'BABYLON',
        number: 1000,
        timestamp: '2021-05-17T12:14:45.937Z',
      },
    },
  ],
}
