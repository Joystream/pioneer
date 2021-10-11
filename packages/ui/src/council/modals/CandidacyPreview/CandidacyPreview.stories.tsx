import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ModalContext } from '@/common/providers/modal/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { CandidacyPreview } from './CandidacyPreview'

export default {
  title: 'Council/CandidacyPreview',
  component: CandidacyPreview,
} as Meta

const Template: Story = (args) => {
  return (
    <MemoryRouter>
      <MockApolloProvider members council>
        <ModalContext.Provider
          value={{
            hideModal: () => undefined,
            modal: 'foo',
            showModal: () => undefined,
            modalData: {
              id: args.id,
            },
          }}
        >
          <CandidacyPreview />
        </ModalContext.Provider>
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = { id: '0-0' }
