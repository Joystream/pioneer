import { Meta, Story } from '@storybook/react'
import React from 'react'

import { getMockAsOpening } from '@/mocks/data'
import { getMockAsUpcomingOpening } from '@/mocks/data/seedUpcomingOpening'

import { OpeningsList, OpeningsListProps } from './OpeningsList'

export default {
  title: 'WorkingGroup/OpeningsListItem',
  component: OpeningsList,
} as Meta

const Template: Story<OpeningsListProps> = (args) => <OpeningsList {...args} />

export const Openings = Template.bind({})
Openings.args = {
  openings: [getMockAsOpening(0), getMockAsOpening(1)],
}

export const UpcomingOpenings = Template.bind({})
UpcomingOpenings.args = {
  openings: [getMockAsUpcomingOpening(0), getMockAsUpcomingOpening(1)],
}
