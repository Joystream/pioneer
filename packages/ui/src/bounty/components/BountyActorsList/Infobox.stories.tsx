import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Infobox, InfoboxProps } from './Infobox'

export default {
  title: 'Bounty/Infobox',
  component: Infobox,
  argTypes: {
    result: {
      options: ['winner', 'loser', 'slashed'],
      control: { type: 'radio' },
    },
  },
} as Meta

const Template: Story<InfoboxProps> = (args) => <Infobox {...args} />

export const Default = Template.bind({})
Default.args = { result: 'winner' }
