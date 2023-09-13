import { Decorator } from '@storybook/react'
import { configure } from '@storybook/testing-library'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { createGlobalStyle } from 'styled-components'

import { GlobalModals } from '../src/app/GlobalModals'
import { GlobalStyle } from '../src/app/providers/GlobalStyle'
import { OnBoardingProvider } from '../src/common/providers/onboarding/provider'
import { NotificationsHolder } from '../src/common/components/page/SideNotification'
import { TransactionStatus } from '../src/common/components/TransactionStatus/TransactionStatus'
import { Colors } from '../src/common/constants'
import { ModalContextProvider } from '../src/common/providers/modal/provider'
import { TransactionStatusProvider } from '../src/common/providers/transactionStatus/provider'
import { MockProvidersDecorator, MockRouterDecorator } from '../src/mocks/providers'
import { i18next } from '../src/services/i18n'
import { KeyringContext } from '../src/common/providers/keyring/context'
import { Keyring } from '@polkadot/ui-keyring'


configure({ testIdAttribute: 'id' })

const stylesWrapperDecorator: Decorator = (Story) => (
  <>
    <GlobalStyle />
    <StoryStyles />
    {Story()}
  </>
)
const StoryStyles = createGlobalStyle`
  body, html {
    overflow: visible
  }
`

const i18nextDecorator: Decorator = (Story) => (
  <React.Suspense fallback="Missing i18next config">
    <I18nextProvider i18n={i18next}>
      <Story />
    </I18nextProvider>
  </React.Suspense>
)

const RHFDecorator: Decorator = (Story) => {
  const form = useForm()
  return (
    <React.Suspense fallback="Loading RHF context">
      <FormProvider {...form}>
        <Story />
      </FormProvider>
    </React.Suspense>
  )
}

const ModalDecorator: Decorator = (Story) => (
  <TransactionStatusProvider>
    <ModalContextProvider>
      <OnBoardingProvider>
        <Story />
        <GlobalModals />
        <NotificationsHolder>
          <TransactionStatus />
        </NotificationsHolder>
      </OnBoardingProvider>
    </ModalContextProvider>
  </TransactionStatusProvider>
)

const KeyringDecorator: Decorator = (Story) => {
  const keyring = {
    encodeAddress: (address: string) => address,
    decodeAddress: (address: string) => {
      if (!/^[A-HJ-NP-Za-km-z1-9]{10,}$/.test(address)) throw new Error('Invalid address')
      else return address
    },
  } as unknown as Keyring
  return <KeyringContext.Provider value={keyring}><Story /></KeyringContext.Provider>
}

export const decorators = [
  ModalDecorator,
  stylesWrapperDecorator,
  i18nextDecorator,
  RHFDecorator,
  KeyringDecorator,
  MockProvidersDecorator,
  MockRouterDecorator,
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'White',
    values: [
      {
        name: 'White',
        value: Colors.White,
      },
      {
        name: 'Black',
        value: Colors.Black[900],
      },
      {
        name: 'Modal',
        value: Colors.Black[50],
      },
      {
        name: 'Disabled',
        value: Colors.Black[75],
      },
      {
        name: 'Around modal glass',
        value: Colors.Black[700.85],
      },
    ],
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['App', 'Pages', 'Common'],
    },
  },
}
