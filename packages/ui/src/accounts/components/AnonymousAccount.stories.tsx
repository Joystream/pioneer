import { Meta, StoryFn } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { Row } from '@/common/components/storybookParts/previewStyles'
import { joy } from '@/mocks/helpers'

import { AnonymousAccount as Component } from './AnonymousAccount'

type Args = {
  address: string
  amount?: number
}

export default {
  title: 'Accounts/AnonymousAccount',
  component: Component,
  args: {
    address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
    amount: 10,
  },
} as Meta<Args>

export const AnonymousAccount: StoryFn<Args> = ({ address, amount }) => (
  <Row>
    <Component address={address} amount={amount ? new BN(joy(amount)) : undefined} />
    <Component address={address} />
  </Row>
)
