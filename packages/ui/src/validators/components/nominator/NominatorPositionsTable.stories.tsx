import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { Tooltip, TooltipPopupTitle, TooltipText } from '@/common/components/Tooltip'
import { Colors, JOY_DECIMAL_PLACES } from '@/common/constants'
import { createType } from '@/common/model/createType'
import { shortenAddress } from '@/common/model/formatters'
import { MockProvidersDecorator } from '@/mocks/providers'
import { NominatorPositionsTable, Props } from '@/validators/components/nominator/NominatorPositionsTable'
import { MyStashPosition } from '@/validators/hooks/useMyStashPositions'
import { ValidatorWithDetails } from '@/validators/types/Validator'

const WideTooltipStyle = createGlobalStyle`
  .wide-tooltip {
    max-width: 600px !important;
    width: max-content;
  }
`

// Helper function to abbreviate token amounts (e.g., 500k, 2.3M)
const abbreviateTokenAmount = (value: BN | number | string | undefined | null): string => {
  try {
    if (!value) return '0'

    // Convert to BN if needed
    let bnValue: BN
    if (typeof value === 'number') {
      bnValue = new BN(value)
    } else if (typeof value === 'string') {
      bnValue = new BN(value)
    } else if (value instanceof BN) {
      bnValue = value
    } else {
      return '0'
    }

    if (bnValue.isZero()) return '0'

    const joyValue = bnValue.divn(Math.pow(10, JOY_DECIMAL_PLACES)).toNumber()
    const absValue = Math.abs(joyValue)

    if (absValue >= 1_000_000_000) {
      const billions = joyValue / 1_000_000_000
      return `${billions.toFixed(1)}B`
    } else if (absValue >= 1_000_000) {
      const millions = joyValue / 1_000_000
      return `${millions.toFixed(1)}M`
    } else if (absValue >= 1_000) {
      const thousands = joyValue / 1_000
      return `${thousands.toFixed(0)}k`
    } else {
      return joyValue.toFixed(1)
    }
  } catch (err) {
    return '0'
  }
}

const NominationsTooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 500px;
  width: 100%;
`

const TooltipSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`

const TooltipDivider = styled.div`
  height: 1px;
  background-color: ${Colors.Black[500]};
  margin: 8px 0;
`

export default {
  title: 'Validators/NominatorPositionsTable',
  component: NominatorPositionsTable,
  decorators: [MockProvidersDecorator],
} as Meta

const Template: Story<Props> = (args) => (
  <div style={{ padding: '20px', width: '1000px' }}>
    <NominatorPositionsTable {...args} />
  </div>
)

const createMockAccount = (address: string, name: string) => ({
  address,
  name,
  source: 'polkadot-js' as const,
})

const createMockPosition = (overrides?: Partial<MyStashPosition>): MyStashPosition => ({
  stash: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  controller: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  totalStake: new BN('100000000000000'), // 100000 JOY
  activeStake: new BN('100000000000000'),
  unlocking: [],
  claimedRewards: [],
  nominations: [],
  validatorPrefsSet: false,
  role: 'nominator',
  ...overrides,
})

const createMockValidator = (address: string): ValidatorWithDetails => ({
  stashAccount: address,
  controllerAccount: address,
  commission: 5,
  isActive: true,
  APR: 12.5,
  staking: {
    total: new BN('100000000000000'),
    own: new BN('10000000000000'),
    nominators: [],
  },
  membership: {
    id: '0',
    handle: 'validator_alice',
    name: 'Alice Validator',
  } as any,
})

export const SingleNominator = Template.bind({})
SingleNominator.args = {
  positions: [createMockPosition()],
  accountsMap: new Map([
    [
      'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      createMockAccount('j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', 'Nominator 1'),
    ],
  ]),
  validatorsMap: new Map(),
  totalStake: new BN('100000000000000'),
  totalClaimable: new BN('5000000000000'),
  showFilter: true,
}

export const MultiplePositions = Template.bind({})
MultiplePositions.args = {
  positions: [
    createMockPosition({
      stash: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      role: 'nominator',
      nominations: ['j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'],
    }),
    createMockPosition({
      stash: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      role: 'validator',
      validatorPrefsSet: true,
      totalStake: new BN('200000000000000'),
      activeStake: new BN('200000000000000'),
    }),
    createMockPosition({
      stash: 'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE',
      role: 'inactive',
      totalStake: new BN('50000000000000'),
      activeStake: new BN('0'),
    }),
  ],
  accountsMap: new Map([
    [
      'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      createMockAccount('j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', 'Nominator 1'),
    ],
    [
      'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      createMockAccount('j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf', 'Validator 1'),
    ],
    [
      'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE',
      createMockAccount('j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE', 'Inactive Account'),
    ],
  ]),
  validatorsMap: new Map([
    [
      'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      createMockValidator('j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'),
    ],
  ]),
  totalStake: new BN('350000000000000'),
  totalClaimable: new BN('15000000000000'),
  showFilter: true,
}

export const WithUnlocking = Template.bind({})
WithUnlocking.args = {
  positions: [
    createMockPosition({
      stash: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      totalStake: new BN('100000000000000'),
      activeStake: new BN('50000000000000'),
      unlocking: [
        {
          era: 1000,
          value: new BN('50000000000000'),
        },
      ],
    }),
  ],
  accountsMap: new Map([
    [
      'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      createMockAccount('j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', 'Unlocking Account'),
    ],
  ]),
  validatorsMap: new Map(),
  totalStake: new BN('100000000000000'),
  totalClaimable: new BN('0'),
  showFilter: true,
}

export const NoFilter = Template.bind({})
NoFilter.args = {
  positions: [
    createMockPosition(),
    createMockPosition({
      stash: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      role: 'validator',
      validatorPrefsSet: true,
    }),
  ],
  accountsMap: new Map([
    [
      'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      createMockAccount('j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', 'Account 1'),
    ],
    [
      'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      createMockAccount('j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf', 'Account 2'),
    ],
  ]),
  validatorsMap: new Map(),
  totalStake: new BN('200000000000000'),
  totalClaimable: new BN('10000000000000'),
  showFilter: false,
}

export const EmptyPositions = Template.bind({})
EmptyPositions.args = {
  positions: [],
  accountsMap: new Map(),
  validatorsMap: new Map(),
  totalStake: new BN('0'),
  totalClaimable: new BN('0'),
  showFilter: true,
}

// Story specifically for testing nominations tooltip with staked amounts
export const WithNominationsTooltip = Template.bind({})
WithNominationsTooltip.args = {
  positions: [
    createMockPosition({
      stash: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      controller: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      role: 'nominator',
      nominations: [
        'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf', // Active validator
        'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE', // Active validator
        'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', // Inactive validator (different from stash)
      ],
      totalStake: new BN('100000000000000'),
      activeStake: new BN('100000000000000'),
    }),
  ],
  accountsMap: new Map([
    [
      'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      createMockAccount('j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', 'Nominator with Multiple Nominations'),
    ],
  ]),
  validatorsMap: new Map([
    [
      'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      createMockValidator('j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'),
    ],
    [
      'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE',
      createMockValidator('j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE'),
    ],
  ]),
  totalStake: new BN('100000000000000'),
  totalClaimable: new BN('5000000000000'),
  showFilter: true,
}
WithNominationsTooltip.parameters = {
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
          erasStakers: (era: number, validatorAddress: any) => {
            const stashAddress = 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT'
            const validator1 = 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'
            const validator2 = 'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE'

            // Convert validatorAddress to string for comparison
            const validatorStr = validatorAddress?.toString() || validatorAddress

            // Return different stake amounts for different validators
            let stakeAmount = '30000000000000' // 30,000 JOY default
            if (validatorStr === validator1) {
              stakeAmount = '40000000000000' // 40,000 JOY
            } else if (validatorStr === validator2) {
              stakeAmount = '30000000000000' // 30,000 JOY
            }

            return {
              isEmpty: false,
              total: '100000000000000',
              own: '10000000000000',
              others: [
                {
                  who: stashAddress,
                  value: stakeAmount,
                },
              ],
            }
          },
        },
        session: {
          validators: [
            createType('AccountId', 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'),
            createType('AccountId', 'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE'),
          ],
        },
      },
    },
  },
}

// Story to test tooltip in active/open state
export const TooltipActiveState: Story = () => {
  const mockNominationsInfo = [
    {
      address: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      isActive: true,
      stake: new BN('40000000000000'), // 40,000 JOY
    },
    {
      address: 'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE',
      isActive: true,
      stake: new BN('30000000000000'), // 30,000 JOY
    },
    {
      address: 'j4ShWRXxTG...wAy3eTLsJt',
      isActive: true,
      stake: new BN('943671330000000'), // 943,671.33 JOY
    },
    {
      address: 'j4W2bw7ggG...Ziym77yzMJ',
      isActive: true,
      stake: new BN('1780361650000000'), // 1,780,361.65 JOY
    },
    {
      address: 'j4UzoJUhDG...9MSN6rYjim',
      isActive: true,
      stake: new BN('246028840000000'), // 246,028.84 JOY
    },
    {
      address: 'j4UKAaX3QJ...N8XwBpQTCe',
      isActive: true,
      stake: new BN('0'), // 0 JOY
    },
    {
      address: 'j4Rew6mSZa...Gz9kPt8iER',
      isActive: true,
      stake: new BN('0'), // 0 JOY
    },
    {
      address: 'j4VDzwrAD5...BdzNwnufft',
      isActive: true,
      stake: new BN('0'), // 0 JOY
    },
    {
      address: 'j4VtV2kGzG...HEaVwYJITV',
      isActive: true,
      stake: new BN('0'), // 0 JOY
    },
    {
      address: 'j4W8paZENR...HhqDmcmNr9',
      isActive: true,
      stake: new BN('0'), // 0 JOY
    },
    {
      address: 'j4Rc8VUXGY...nWTh5SpemP',
      isActive: true,
      stake: new BN('1529938210000000'), // 1,529,938.21 JOY
    },
    {
      address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      isActive: false,
    },
  ]

  const activeNominations = mockNominationsInfo.filter((n) => n.isActive)
  const inactiveNominations = mockNominationsInfo.filter((n) => !n.isActive)

  return (
    <>
      <WideTooltipStyle />
      <div style={{ padding: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Tooltip
          className="wide-tooltip"
          tooltipOpen={true}
          popupContent={
            <NominationsTooltipContent>
              {activeNominations.length > 0 && (
                <>
                  <TooltipSection>
                    <TooltipPopupTitle>Active ({activeNominations.length})</TooltipPopupTitle>
                    {activeNominations.map((nom) => (
                      <TooltipRow key={nom.address}>
                        <TooltipText>
                          {nom.address.includes('...') ? nom.address : shortenAddress(encodeAddress(nom.address), 20)}
                        </TooltipText>
                        {nom.stake && (
                          <TooltipText>
                            {(() => {
                              try {
                                const stake = nom.stake as any
                                if (stake instanceof BN) {
                                  return abbreviateTokenAmount(stake)
                                } else if (stake && typeof stake.toNumber === 'function') {
                                  return abbreviateTokenAmount(stake.toNumber())
                                } else if (stake && typeof stake.toBn === 'function') {
                                  return abbreviateTokenAmount(stake.toBn())
                                } else if (typeof stake === 'number' || typeof stake === 'string') {
                                  return abbreviateTokenAmount(stake)
                                } else {
                                  return '0'
                                }
                              } catch (err) {
                                return '0'
                              }
                            })()}
                          </TooltipText>
                        )}
                      </TooltipRow>
                    ))}
                  </TooltipSection>
                  {inactiveNominations.length > 0 && <TooltipDivider />}
                </>
              )}
              {inactiveNominations.length > 0 && (
                <TooltipSection>
                  <TooltipPopupTitle>Inactive ({inactiveNominations.length})</TooltipPopupTitle>
                  {inactiveNominations.map((nom) => (
                    <TooltipRow key={nom.address}>
                      <TooltipText>
                        {nom.address.includes('...') ? nom.address : shortenAddress(encodeAddress(nom.address), 20)}
                      </TooltipText>
                    </TooltipRow>
                  ))}
                </TooltipSection>
              )}
            </NominationsTooltipContent>
          }
        >
          <div style={{ padding: '20px', background: Colors.Black[100], borderRadius: '4px', cursor: 'pointer' }}>
            Hover or click to see tooltip (tooltip is forced open in this story)
          </div>
        </Tooltip>
      </div>
    </>
  )
}
TooltipActiveState.parameters = {
  docs: {
    description: {
      story:
        'This story shows the nominations tooltip in an active/open state for testing purposes. The tooltip displays active and inactive nominations with their stake amounts.',
    },
  },
}

export const WithSetNomineeAndStopButtons = Template.bind({})
WithSetNomineeAndStopButtons.args = {
  positions: [
    createMockPosition({
      stash: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      controller: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', // Controller set - Stop button enabled
      role: 'nominator',
      nominations: ['j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'],
      totalStake: new BN('100000000000000'),
      activeStake: new BN('100000000000000'),
    }),
    createMockPosition({
      stash: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      controller: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf', // Controller set - Stop button enabled
      role: 'validator',
      validatorPrefsSet: true,
      totalStake: new BN('200000000000000'),
      activeStake: new BN('200000000000000'),
    }),
    createMockPosition({
      stash: 'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE', // BOB - valid test address
      controller: undefined, // No controller - Stop button disabled
      role: 'nominator',
      nominations: [],
      totalStake: new BN('50000000000000'),
      activeStake: new BN('50000000000000'),
    }),
  ],
  accountsMap: new Map([
    [
      'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
      createMockAccount('j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', 'Nominator with Controller'),
    ],
    [
      'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      createMockAccount('j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf', 'Validator with Controller'),
    ],
    [
      'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE', // BOB - valid test address
      createMockAccount('j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE', 'Nominator without Controller'),
    ],
  ]),
  validatorsMap: new Map([
    [
      'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      createMockValidator('j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'),
    ],
  ]),
  totalStake: new BN('350000000000000'),
  totalClaimable: new BN('15000000000000'),
  showFilter: true,
}
