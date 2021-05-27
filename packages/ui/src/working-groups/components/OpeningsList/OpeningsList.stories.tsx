import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { getMockAsOpening } from '@/mocks/data/mockOpenings'

import { OpeningsList, OpeningsListProps } from './OpeningsList'

export default {
  title: 'WorkingGroup/OpeningsList',
  component: OpeningsList,
} as Meta

const Template: Story<OpeningsListProps> = (args) => (
  <MemoryRouter>
    <OpeningsList {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})

Default.args = {
  openings: [getMockAsOpening(0), getMockAsOpening(1)],
}
