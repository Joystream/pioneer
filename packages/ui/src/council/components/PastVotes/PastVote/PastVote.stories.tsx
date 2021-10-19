import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { PastVote, PastVoteProps } from './PastVote'

import { getMember } from '@/../test/_mocks/members'

export default {
  title: 'Council/PastVote',
  component: PastVote,
  argTypes: {
    memberSize: { table: { disable: true } },
  },
} as Meta

const Template: Story<PastVoteProps> = (args) => <PastVote {...args} />

export const Default = Template.bind({})
const revealedArgs: PastVoteProps = {
  vote: {
    stake: new BN(10000000),
    stakeLocked: true,
    castBy: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    voteFor: getMember('alice'),
    cycleId: 6,
  },
}
Default.args = revealedArgs

export const Unrevealed = Template.bind({})
const unrevealedArgs: PastVoteProps = {
  vote: {
    stake: new BN(10000000),
    stakeLocked: true,
    castBy: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    cycleId: 6,
  },
}
Unrevealed.args = unrevealedArgs
