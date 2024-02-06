import { StoryContext } from '@storybook/react'
import { isFunction } from 'lodash'
import React, { useMemo } from 'react'

import { MockAccountsProps, MockAccountsProvider } from './accounts'
import { MockApiProvider, MockApiProps } from './api'
import { MockBackendProps, MockBackendProvider } from './backend'
import { MockGqlProps, MockGqlProvider } from './gql'
import { MockLocalStorage, useMockLocalStorage } from './useMockLocalStorage'

export * from './router'

export type MocksParameters = MockApiProps & { gql?: MockGqlProps } & MockBackendProps &
  MockAccountsProps &
  MockLocalStorage

type Context = StoryContext & {
  parameters: { mocks?: MocksParameters | ((storyContext: StoryContext) => MocksParameters) }
}

export const MockProvidersDecorator = (Story: CallableFunction, storyContext: Context) => {
  const mocks = useMemo(() => {
    const mocks = storyContext.parameters.mocks
    return isFunction(mocks) ? mocks(storyContext) : mocks
  }, [storyContext])

  useMockLocalStorage(mocks?.localStorage)

  return (
    <MockApiProvider chain={mocks?.chain}>
      <MockGqlProvider queries={mocks?.gql?.queries} mutations={mocks?.gql?.mutations}>
        <MockAccountsProvider accounts={mocks?.accounts}>
          <MockBackendProvider backend={mocks?.backend}>
            <Story />
          </MockBackendProvider>
        </MockAccountsProvider>
      </MockGqlProvider>
    </MockApiProvider>
  )
}
