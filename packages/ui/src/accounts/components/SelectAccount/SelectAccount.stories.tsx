import { Meta, Story } from '@storybook/react'
import React, { ReactNode, useState } from 'react'

import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { Account } from '@/accounts/types'
import { InputComponent } from '@/common/components/forms'
import { Warning } from '@/common/components/Warning'
import { KeyringContextProvider } from '@/common/providers/keyring/provider'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { SelectAccount } from '.'

export default {
  title: 'Accounts/SelectAccount',
  component: SelectAccount,
} as Meta

const renderWarning = (accountSelect: ReactNode) => (
  <>
    <Warning
      isClosable={false}
      title="Warning: the Polkadot.js extension can't run in an iframe !"
      content={
        <>
          To render this component properly:{' '}
          <a href={window.location.href} target="_blank">
            Open the canvas in a new tab
          </a>
        </>
      }
    />
    <br />
    {accountSelect}
  </>
)

export const Default: Story = () => {
  const [selected, setSelected] = useState<Account>()

  const accountSelect = (
    <InputComponent
      label="Account select"
      tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
      required
      inputSize="l"
    >
      <SelectAccount selected={selected} onChange={setSelected} />
    </InputComponent>
  )

  return window.self === window.top ? (
    <MockApolloProvider members>
      <KeyringContextProvider>
        <AccountsContextProvider>{accountSelect}</AccountsContextProvider>
      </KeyringContextProvider>
    </MockApolloProvider>
  ) : (
    renderWarning(accountSelect)
  )
}
