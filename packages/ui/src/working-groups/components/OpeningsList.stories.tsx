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
      shortDescription: 'Become A Distribution Leader',
      description:
        '### Intro\n\nContent Curators will one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated.\n\n#### Details\n\nOur current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.',
      expectedEnding: '2021-03-09T10:18:04.155Z',
      type: 'LEADER',
      reward: { value: new BN(1000), interval: 3600 },
      applicants: { current: 2, total: 10 },
      hiring: { current: 0, total: 1 },
      status: 'OpeningStatusOpen',
      stake: new BN(2_000),
    },
    {
      id: '221',
      title: 'Storage working group worker',
      shortDescription: 'Become A Distribution Leader',
      description:
        '### Intro\n\nContent Curators will one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated.\n\n#### Details\n\nOur current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.',
      expectedEnding: '2021-03-09T10:18:04.155Z',
      type: 'REGULAR',
      reward: { value: new BN(800), interval: 76 },
      applicants: { current: 8, total: 10 },
      hiring: { current: 1, total: 1 },
      status: 'OpeningStatusOpen',
      stake: new BN(2_000),
    },
  ],
}
