import { Meta, Story } from '@storybook/react'
import React from 'react'

import { RolesList, RolesListProps } from '@/working-groups/components/RolesList'

export default {
  title: 'WorkingGroup/RolesList',
  component: RolesList,
} as Meta

const Template: Story<RolesListProps> = (args) => <RolesList {...args} />

export const Default = Template.bind({})
Default.args = {
  workers: [
    {
      group: { id: '0', name: 'forum' },
      membership: { id: '0' },
      status: 'WorkerStatusActive',
      rewardPerBlock: 100,
      earnedTotal: 1000,
      stake: 1000,
      isLeader: false,
    },
  ],
}
