import { Meta, Story } from '@storybook/react'
import React from 'react'

import { WorkersList, WorkersListProps } from './WorkersList'

export default {
  title: 'WorkingGroup/WorkersList',
  component: WorkersList,
} as Meta

const Template: Story<WorkersListProps> = (args) => <WorkersList {...args} />

export const Empty = Template.bind({})
Empty.args = {}

export const WithLeader = Template.bind({})
WithLeader.args = {
  leader: {
    id: '0',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: false,
    isFoundingMember: false,
    roles: [],
    inviteCount: 0,
  },
}
