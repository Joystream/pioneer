import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
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
    unpaidReward: new BN(13923),
    stake: new BN(130923),
    numberOfTerms: 2,
  },
}
