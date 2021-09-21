import { Meta, Story } from '@storybook/react'
import React from 'react'

import { getMember } from '@/mocks/helpers'

import { CouncilListItem, CouncilListItemProps } from './CouncilListItem'

export default {
  title: 'Council/CouncilList/CouncilListItem',
  component: CouncilListItem,
} as Meta

const Template: Story<CouncilListItemProps> = (args) => <CouncilListItem {...args} />

export const Default = Template.bind({})
Default.args = {
  councilor: {
    member: getMember('alice'),
    unpaidReward: 13923,
    stake: 130923,
    numberOfTerms: 2,
  },
}
