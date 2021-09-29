import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { CandidacyPreview } from './CandidacyPreview'

export default {
  title: 'Council/CandidacyPreview',
  component: CandidacyPreview,
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider members>
      <ModalContext.Provider
        value={{
          hideModal: () => undefined,
          modal: 'foo',
          showModal: () => undefined,
          modalData: {
            id: '0',
          },
        }}
      >
        <CandidacyPreview />
      </ModalContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
