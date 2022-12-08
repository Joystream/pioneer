import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { VoteForCouncilSuccessModal } from './VoteForCouncilSuccessModal'

export default {
  title: 'Council/VoteForCouncil/VoteForCouncilSuccessModal',
  component: VoteForCouncilSuccessModal,
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
    <MockApolloProvider members council>
      <ModalContext.Provider value={{ modalData, modal: null, hideModal, showModal }}>
        <VoteForCouncilSuccessModal onClose={hideModal} candidateId={modalData.id} />
      </ModalContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  id: '0-0',
}
