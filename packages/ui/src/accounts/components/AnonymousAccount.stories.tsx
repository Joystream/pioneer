import { Meta, StoryFn } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { Row } from '@/common/components/storybookParts/previewStyles'
import { joy } from '@/mocks/helpers'

import { AnonymousAccount } from './AnonymousAccount'

type Args = {
  address: string
  amount?: string
}

export default {
  title: 'Accounts/AnonymousAccount',
  component: AnonymousAccount,
  args: {
    address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
    amount: joy(10),
  },
} as Meta<Args>

export const Default: StoryFn<Args> = ({ address, amount }) => (
  <Row>
    <AnonymousAccount address={address} amount={amount ? new BN(amount) : undefined} />
    <AnonymousAccount address={address} />
  </Row>
)
