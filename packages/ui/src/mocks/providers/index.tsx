import { StoryContext } from '@storybook/react'
import { isFunction } from 'lodash'
import React, { useMemo } from 'react'

import { MockAccountsProps, MockAccountsProvider } from './accounts'
import { MockApiProvider, MockApiProps } from './api'
import { MockQNProps, MockQNProvider } from './query-node'

export type MocksParameters = MockApiProps & MockQNProps & MockAccountsProps

type Context = StoryContext & {
  parameters: { mocks: MocksParameters | ((storyContext: StoryContext) => MocksParameters) }
}

export const MockProvidersDecorator = (Story: CallableFunction, storyContext: Context) => {
  const mocks = useMemo(() => {
    const mocks = storyContext.parameters.mocks
    return isFunction(mocks) ? mocks(storyContext) : mocks
  }, [storyContext])

  return (
    <MockApiProvider chain={mocks?.chain}>
      <MockQNProvider queryNode={mocks?.queryNode}>
        <MockAccountsProvider accounts={mocks?.accounts}>
          <Story />
        </MockAccountsProvider>
      </MockQNProvider>
    </MockApiProvider>
  )
}
