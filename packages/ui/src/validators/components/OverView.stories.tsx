import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { MockProvidersDecorator } from '@/mocks/providers'
import { Overview } from '@/validators/components/OverView'

export default {
  title: 'Validators/Overview',
  component: Overview,
  decorators: [MockProvidersDecorator],
} as Meta

const Template: Story = () => (
  <div style={{ padding: '20px', width: '100%', maxWidth: '1400px' }}>
    <Overview />
  </div>
)

// Mock data for chart - month view with data
const createMonthChartMocks = () => ({
  chain: {
    query: {
      staking: {
        activeEra: {
          unwrap: () => ({
            index: { toNumber: () => 1000 },
          }),
          isNone: false,
        },
        bonded: {
          multi: () => [],
        },
        validators: {
          multi: () => [],
        },
        nominators: {
          multi: () => [],
        },
        ledger: {
          multi: () => [],
        },
        erasStakers: () => ({
          isEmpty: false,
          total: { toBn: () => new BN('100000000000000') },
        }),
        validatorSlashInEra: () => ({
          isSome: false,
        }),
      },
    },
    derive: {
      staking: {
        erasRewards: () => [
          {
            era: { toNumber: () => 996 },
            eraReward: { isZero: () => false, muln: () => new BN('1000000000000'), divn: () => new BN('100000000000') },
          },
          {
            era: { toNumber: () => 997 },
            eraReward: { isZero: () => false, muln: () => new BN('1100000000000'), divn: () => new BN('110000000000') },
          },
          {
            era: { toNumber: () => 998 },
            eraReward: { isZero: () => false, muln: () => new BN('1050000000000'), divn: () => new BN('105000000000') },
          },
          {
            era: { toNumber: () => 999 },
            eraReward: { isZero: () => false, muln: () => new BN('1200000000000'), divn: () => new BN('120000000000') },
          },
        ],
        erasPoints: () => [
          {
            era: { toNumber: () => 996 },
            eraPoints: { toNumber: () => 1000 },
            validators: {},
          },
          {
            era: { toNumber: () => 997 },
            eraPoints: { toNumber: () => 1100 },
            validators: {},
          },
          {
            era: { toNumber: () => 998 },
            eraPoints: { toNumber: () => 1050 },
            validators: {},
          },
          {
            era: { toNumber: () => 999 },
            eraPoints: { toNumber: () => 1200 },
            validators: {},
          },
        ],
      },
    },
  },
  accounts: {
    active: 'alice',
    list: [
      {
        address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
        name: 'Validator Account',
        source: 'polkadot-js',
      },
    ],
    hasWallet: true,
  },
})

export const WithData = Template.bind({})
WithData.parameters = {
  mocks: createMonthChartMocks(),
}

export const EmptyState = Template.bind({})
EmptyState.parameters = {
  mocks: {
    chain: {
      query: {
        staking: {
          activeEra: {
            unwrap: () => ({
              index: { toNumber: () => 1000 },
            }),
            isNone: false,
          },
          bonded: {
            multi: () => [],
          },
          validators: {
            multi: () => [],
          },
          nominators: {
            multi: () => [],
          },
        },
      },
      derive: {
        staking: {
          erasRewards: () => [],
          erasPoints: () => [],
        },
      },
    },
    accounts: {
      active: undefined,
      list: [],
      hasWallet: false,
    },
  },
}
