import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Infobox, InfoboxProps } from './Infobox'

export default {
  title: 'Bounty/Infobox',
  component: Infobox,
} as Meta

const Template: Story<InfoboxProps> = (args) => <Infobox {...args} />

export const Winner = Template.bind({})
Winner.args = {
  result: 'winner',
  title: 'You are a winner',
  text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
}

export const Loser = Template.bind({})
Loser.args = {
  result: 'loser',
  title: 'You can withdraw stake',
  text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
}

export const Slashed = Template.bind({})
Slashed.args = {
  result: 'slashed',
  title: 'You are slashed',
  text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
}
