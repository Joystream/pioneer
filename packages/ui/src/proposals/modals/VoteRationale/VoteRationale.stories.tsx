import { Meta, StoryObj } from '@storybook/react'
import React, { ReactElement } from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { VoteRationale } from './VoteRationale'

export default {
  title: 'VoteForProposalModalForm/Components/VoteRationale',
  component: VoteRationale,
} as Meta

export const Default: StoryObj<() => ReactElement> = {
  name: 'VoteRationale',

  render: () => (
    <MockApolloProvider members proposals workingGroups workers>
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
  ),
}
