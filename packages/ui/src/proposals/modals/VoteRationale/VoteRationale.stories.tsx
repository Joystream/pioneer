import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { VoteRationale } from './VoteRationale'

export default {
  title: 'Proposals/VoteRationale',
  component: VoteRationale,
} as Meta

export const Default: Story = () => {
  return (
    <MemoryRouter>
      <MockApolloProvider members proposals>
        <ModalContext.Provider
          value={{
            modalData: {
              id: '1',
            },
            modal: 'Foo',
            hideModal: () => undefined,
            showModal: () => undefined,
          }}
        >
          <VoteRationale />
        </ModalContext.Provider>
      </MockApolloProvider>
    </MemoryRouter>
  )
}

Default.args = {}
