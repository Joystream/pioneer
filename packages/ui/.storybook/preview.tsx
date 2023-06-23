import { Decorator } from '@storybook/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { MemoryRouter, Redirect, Route, Switch } from 'react-router'
import { createGlobalStyle } from 'styled-components'

import { GlobalModals } from '../src/app/GlobalModals'
import { NotFound } from '../src/app/pages/NotFound'
import { GlobalStyle } from '../src/app/providers/GlobalStyle'
import { NotificationsHolder } from '../src/common/components/page/SideNotification'
import { TransactionStatus } from '../src/common/components/TransactionStatus/TransactionStatus'
import { Colors } from '../src/common/constants'
import { ModalContextProvider } from '../src/common/providers/modal/provider'
import { TransactionStatusProvider } from '../src/common/providers/transactionStatus/provider'
import { MockProvidersDecorator } from '../src/mocks/providers'
import { i18next } from '../src/services/i18n'

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

const RouterDecorator: Decorator = (Story, { parameters }) => (
  <MemoryRouter initialEntries={[`/story/${parameters.router?.href ?? ''}`]}>
    <Switch>
      <Route component={Story} path={`/story/${parameters.router?.path ?? ''}`} />
      <Route exact path="/404" component={NotFound} />
      <Redirect from="*" to="/404" />
    </Switch>
  </MemoryRouter>
)

const ModalDecorator: Decorator = (Story) => (
  <TransactionStatusProvider>
    <ModalContextProvider>
      <Story />
      <GlobalModals />
      <NotificationsHolder>
        <TransactionStatus />
      </NotificationsHolder>
    </ModalContextProvider>
  </TransactionStatusProvider>
)

export const decorators = [
  ModalDecorator,
  stylesWrapperDecorator,
  i18nextDecorator,
  RHFDecorator,
  MockProvidersDecorator,
  RouterDecorator,
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
      order: ['Common'],
    },
  },
}
