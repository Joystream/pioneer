import { BN_THOUSAND } from '@polkadot/util'
import { Args, Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'
import { MocksParameters } from '@/mocks/providers'

import { BlacklistedAccounts } from './BlacklistedAccounts'

const allAccounts = [
  'j4Rc8VUXGYAx7FNbVZBFU72rQw3GaCuG2AkrUQWnWTh5SpemP',
  'j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa',
  'j4RbTjvPyaufVVoxVGk5vEKHma1k7j5ZAQCaAL9qMKQWKAswW',
  'j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz',
]

const mockDefaultBalance = {
  locked: BN_ZERO,
  recoverable: BN_ZERO,
  transferable: BN_ZERO,
  locks: [],
  vestingTotal: BN_ZERO,
  vestedClaimable: BN_ZERO,
  vestedBalance: BN_ZERO,
  vestingLocked: BN_ZERO,
  vesting: [],
  total: BN_THOUSAND,
}

const useMyBalances: AddressToBalanceMap = {
  [allAccounts[0]]: {
    ...mockDefaultBalance,
    total: new BN(200_000_000_000),
  },
  [allAccounts[1]]: {
    ...mockDefaultBalance,
    total: new BN(200_000_000_000),
  },
  [allAccounts[2]]: {
    ...mockDefaultBalance,
    total: new BN(200_000_000_000),
  },
  [allAccounts[3]]: {
    ...mockDefaultBalance,
    total: new BN(200_000_000_000),
  },
}
export default {
  title: 'Pages/Blacklisted Accounts',
  component: BlacklistedAccounts,
  parameters: {
    mocks: (): MocksParameters => {
      return {
        chain: {
          derive: {
            balances: {
              all: {},
            },
          },
          query: {
            council: {
              stage: { stage: { isIdle: true }, changedAt: 123 },
            },
            referendum: {
              accountsOptedOut: {
                keys: [...allAccounts, ...allAccounts, ...allAccounts, ...allAccounts, ...allAccounts],
              },
              stage: {},
            },
          },
        },
      }
    },
  },
} satisfies Meta<Args>

const Template: Story = () => {
  return (
    <BalancesContext.Provider value={useMyBalances}>
      <BlacklistedAccounts />
    </BalancesContext.Provider>
  )
}

export const Default = Template.bind({})
