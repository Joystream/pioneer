import { Meta } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { VestingListItem } from '@/accounts/modals/ClaimVestingModal/components/SelectVestingAccount'
import { InputComponent } from '@/common/components/forms'
import { SelectedOption } from '@/common/components/selects'

import { MockKeyringProvider } from '../../../../../test/_mocks/providers'

export default {
  title: 'Accounts/VestingListItem',
  component: VestingListItem,
} as Meta

export const Default = () => {
  return (
    <MockKeyringProvider>
      <InputComponent inputSize="l">
        <SelectedOption>
          <VestingListItem
            option={{ address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', name: 'Alice' }}
            vestingClaimable={new BN(100_0000000000)}
          />
        </SelectedOption>
      </InputComponent>
    </MockKeyringProvider>
  )
}
