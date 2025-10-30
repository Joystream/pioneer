import { Meta, StoryObj } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { Row } from '@/common/components/storybookParts/previewStyles'
import { joy } from '@/mocks/helpers'

import { AnonymousAccount } from './AnonymousAccount'

type Args = {
  address: string
  amount?: number
}

export default {
  title: 'Accounts/AnonymousAccount',
  component: AnonymousAccount,
  args: {
    address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
    amount: 10,
  },
} as Meta<Args>

export const Default: StoryObj<Args> = {
  name: 'AnonymousAccount',
  render: ({ address, amount }) => (
    <Row>
      <AnonymousAccount address={address} amount={amount ? new BN(joy(amount)) : undefined} />
      <AnonymousAccount address={address} />
    </Row>
  ),
}
