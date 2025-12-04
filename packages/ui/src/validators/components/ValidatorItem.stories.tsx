import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { ValidatorItem, ValidatorItemProps } from '@/validators/components/ValidatorItem'
import { SelectedValidatorsProvider } from '@/validators/context/SelectedValidatorsContext'
import { ValidatorWithDetails } from '@/validators/types/Validator'

export default {
  title: 'Validators/ValidatorItem',
  component: ValidatorItem,
  decorators: [
    (Story) => (
      <MockApolloProvider members>
        <SelectedValidatorsProvider>
          <div style={{ padding: '20px', width: '1200px' }}>
            <Story />
          </div>
        </SelectedValidatorsProvider>
      </MockApolloProvider>
    ),
  ],
} as Meta

const Template: Story<ValidatorItemProps> = (args) => <ValidatorItem {...args} />

const createMockValidator = (overrides?: Partial<ValidatorWithDetails>): ValidatorWithDetails => ({
  stashAccount: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  controllerAccount: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  commission: 5,
  isVerifiedValidator: false,
  isActive: true,
  APR: 12.5,
  staking: {
    total: new BN('100000000000000'), // 100000 JOY
    own: new BN('10000000000000'), // 10000 JOY
    nominators: [],
  },
  membership: {
    id: '0',
    handle: 'validator_alice',
    name: 'Alice Validator',
  } as any,
  ...overrides,
})

export const ActiveValidator = Template.bind({})
ActiveValidator.args = {
  validator: createMockValidator(),
  isNominated: false,
}

export const VerifiedValidator = Template.bind({})
VerifiedValidator.args = {
  validator: createMockValidator({
    isVerifiedValidator: true,
    membership: {
      id: '1',
      handle: 'verified_validator',
      name: 'Verified Validator',
    } as any,
  }),
  isNominated: false,
}

export const InactiveValidator = Template.bind({})
InactiveValidator.args = {
  validator: createMockValidator({
    isActive: false,
    membership: {
      id: '2',
      handle: 'inactive_validator',
      name: 'Inactive Validator',
    } as any,
  }),
  isNominated: false,
}

export const HighCommission = Template.bind({})
HighCommission.args = {
  validator: createMockValidator({
    commission: 20,
    membership: {
      id: '3',
      handle: 'high_commission',
      name: 'High Commission Validator',
    } as any,
  }),
  isNominated: false,
}

export const LowCommission = Template.bind({})
LowCommission.args = {
  validator: createMockValidator({
    commission: 1,
    membership: {
      id: '4',
      handle: 'low_commission',
      name: 'Low Commission Validator',
    } as any,
  }),
  isNominated: false,
}

export const HighAPR = Template.bind({})
HighAPR.args = {
  validator: createMockValidator({
    APR: 25.5,
    membership: {
      id: '5',
      handle: 'high_apr',
      name: 'High APR Validator',
    } as any,
  }),
  isNominated: false,
}

export const LargeStake = Template.bind({})
LargeStake.args = {
  validator: createMockValidator({
    staking: {
      total: new BN('1000000000000000'), // 1000000 JOY
      own: new BN('500000000000000'), // 500000 JOY
      nominators: [],
    },
    membership: {
      id: '6',
      handle: 'large_stake',
      name: 'Large Stake Validator',
    } as any,
  }),
  isNominated: false,
}

export const Nominated = Template.bind({})
Nominated.args = {
  validator: createMockValidator({
    membership: {
      id: '7',
      handle: 'nominated_validator',
      name: 'Nominated Validator',
    } as any,
  }),
  isNominated: true,
}
