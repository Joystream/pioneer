import { Meta } from '@storybook/react'

import { AccountInfo } from './AccountInfo'

export default {
  title: 'Accounts/AccountInfo',
  component: AccountInfo,
  args: {
    account: {
      name: 'Alice',
      address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
    },
    lockType: 'Invitation',
  },
} as Meta

export const Default = {
  name: 'AccountInfo',
}
