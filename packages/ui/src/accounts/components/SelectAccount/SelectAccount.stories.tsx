import { Meta, StoryFn } from '@storybook/react'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Account } from '@/accounts/types'
import { InputComponent } from '@/common/components/forms'
import { MocksParameters } from '@/mocks/providers'

import { SelectAccount } from '.'
import { mockAccounts } from './OptionListAccount.stories'

export default {
  title: 'Accounts/SelectAccount',
  component: SelectAccount,

  parameters: {
    mocks: {
      accounts: { list: mockAccounts },
    } satisfies MocksParameters,
  },
} satisfies Meta

export const Default: StoryFn = () => {
  const [selected, setSelected] = useState<Account>()

  return (
    <StyledInputComponent
      label="Account select"
      tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
      required
      inputSize="l"
    >
      <SelectAccount selected={selected} onChange={setSelected} />
    </StyledInputComponent>
  )
}

const StyledInputComponent = styled(InputComponent)`
  max-width: 856px;
`
