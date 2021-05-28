import { Meta, Story } from '@storybook/react'
import * as faker from 'faker'
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
    { ...getMockAsOpening(0), hiringLimit: 2, expectedStart: faker.date.soon(1).toJSON() },
    { ...getMockAsOpening(1), hiringLimit: 1, expectedStart: faker.date.soon(4).toJSON() },
  ],
}
