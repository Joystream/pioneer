import { Meta } from '@storybook/react'
import BN from 'bn.js'

import { AccountInfo } from './AccountInfo'

export default {
  title: 'Accounts/AccountInfo',
  component: AccountInfo,
  args: {
    account: {
      name: 'Alice',
      address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
    },
    amount: new BN(1000000),
    lockType: 'Invitation',
  },
} as Meta

export const Default = {}
