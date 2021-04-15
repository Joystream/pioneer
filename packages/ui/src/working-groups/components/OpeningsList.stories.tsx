import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { OpeningsList, OpeningsListProps } from './OpeningsList'

export default {
  title: 'WorkingGroup/OpeningsList',
  component: OpeningsList,
} as Meta

const Template: Story<OpeningsListProps> = (args) => <OpeningsList {...args} />

export const Default = Template.bind({})

Default.args = {
  openings: [
    {
      id: '123',
      title: 'Storage working group leader',
      expectedEnding: '2021-03-09T10:18:04.155Z',
      type: 'LEADER',
      reward: { value: new BN(1000), interval: 3600 },
      applicants: { current: 2, total: 10 },
      hiring: { current: 0, total: 1 },
    },
    {
      id: '221',
      title: 'Storage working group worker',
      expectedEnding: '2021-03-09T10:18:04.155Z',
      type: 'REGULAR',
      reward: { value: new BN(800), interval: 76 },
      applicants: { current: 8, total: 10 },
      hiring: { current: 1, total: 1 },
    },
  ],
}
