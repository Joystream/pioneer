import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { getMockAsOpening } from '@/mocks/data/mockOpenings'

import { UpcomingOpeningsList, UpcomingOpeningsListProps } from './UpcomingOpeningsList'

export default {
  title: 'WorkingGroup/UpcomingOpeningsList',
  component: UpcomingOpeningsList,
} as Meta

const Template: Story<UpcomingOpeningsListProps> = (args) => (
  <MemoryRouter>
    <UpcomingOpeningsList {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})

Default.args = {
  openings: [
    { ...getMockAsOpening(0), hiringLimit: 2 },
    { ...getMockAsOpening(1), hiringLimit: 1 },
  ],
}
