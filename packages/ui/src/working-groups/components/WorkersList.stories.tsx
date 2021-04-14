import { Meta, Story } from '@storybook/react'
import React from 'react'

import { WorkersList, WorkersListProps } from './WorkersList'

export default {
  title: 'WorkingGroup/WorkersList',
  component: WorkersList,
} as Meta

const Template: Story<WorkersListProps> = (args) => <WorkersList {...args} />

export const Default = Template.bind({})

Default.args = {}
