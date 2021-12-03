import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { randomBlock } from '@/mocks/helpers/randomBlock'

import { PastVoteColumns } from '../styles'

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
  $colLayout: PastVoteColumns,
  vote: {
    id: '0',
    createdAtBlock: randomBlock(),
    stake: new BN(10000000),
    stakeLocked: true,
    castBy: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    voteFor: getMember('alice'),
    cycleId: 6,
    commitment: 'foo',
  },
}
Default.args = revealedArgs

export const Unrevealed = Template.bind({})
const unrevealedArgs: PastVoteProps = {
  $colLayout: PastVoteColumns,
  vote: {
    id: '0',
    createdAtBlock: randomBlock(),
    stake: new BN(10000000),
    stakeLocked: true,
    castBy: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    cycleId: 6,
    commitment: 'foo',
  },
}
Unrevealed.args = unrevealedArgs
