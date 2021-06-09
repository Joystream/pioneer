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
    applicationId: '0',
    member: {
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
  },
}

export const WithWorkers = Template.bind({})
WithWorkers.args = {
  workers: [
    {
      applicationId: '0',
      member: {
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
    },
    {
      applicationId: '0',
      member: {
        id: '1',
        name: 'Bob member',
        rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        handle: 'bob',
        isVerified: false,
        isFoundingMember: false,
        roles: [],
        inviteCount: 0,
      },
    },
    {
      applicationId: '0',
      member: {
        id: '3',
        name: 'Charlie member',
        rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        handle: 'charile',
        isVerified: false,
        isFoundingMember: false,
        roles: [],
        inviteCount: 0,
      },
    },
  ],
}

export const WithLeaderAndWorkers = Template.bind({})
WithLeaderAndWorkers.args = {
  leader: {
    applicationId: '0',
    member: {
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
  },
  workers: [
    {
      applicationId: '0',
      member: {
        id: '1',
        name: 'Bob member',
        rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        handle: 'bob',
        isVerified: false,
        isFoundingMember: false,
        roles: [],
        inviteCount: 0,
      },
    },
    {
      applicationId: '0',
      member: {
        id: '3',
        name: 'Charlie member',
        rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        handle: 'charile',
        isVerified: false,
        isFoundingMember: false,
        roles: [],
        inviteCount: 0,
      },
    },
  ],
}
