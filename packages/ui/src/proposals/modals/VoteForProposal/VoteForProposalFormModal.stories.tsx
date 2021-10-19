import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ModalContext } from '@/common/providers/modal/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { VoteForProposalModalForm, VoteForProposalModalFormProps } from './VoteForProposalModalForm'

export default {
  title: 'Proposals/VoteForProposal/VoteForProposalModalForm',
  component: VoteForProposalModalForm,
  argTypes: {
    hideModal: { action: 'hideModal' },
    showModal: { action: 'showModal' },
  },
} as Meta

interface Props {
  id: string
  hideModal: () => void
  showModal: () => void
}

const Template: Story<Props> = ({ id, hideModal, showModal }) => {
  const modalData = { id }
  return (
    <MemoryRouter>
      <MockApolloProvider members council>
        <ModalContext.Provider value={{ modalData, modal: null, hideModal, showModal }}>
          <VoteForProposalModalForm />
        </ModalContext.Provider>
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {
  id: '0-0',
}
