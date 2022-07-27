import { Meta, Story } from '@storybook/react'
import React from 'react'

import { getMockAsOpening } from '../../../mocks/data/seedOpenings'

import { LoadingOpenings, LoadingOpeningsProps } from './LoadingOpenings'

export default {
  title: 'WorkingGroup/LoadingOpenings',
  component: LoadingOpenings,
} as Meta

const Template: Story<LoadingOpeningsProps> = (args) => <LoadingOpenings {...args} />

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
  openings: [getMockAsOpening(0), getMockAsOpening(1)],
}

export const Empty = Template.bind({})
Empty.args = {
  isLoading: false,
  openings: [],
}
