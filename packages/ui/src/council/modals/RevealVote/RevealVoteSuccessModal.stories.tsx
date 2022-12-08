import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'

import { RevealVoteSuccessModal } from './RevealVoteSuccessModal'

export default {
  title: 'Council/RevealVote/RevealVoteSuccessModal',
  component: RevealVoteSuccessModal,
  argTypes: {
    hideModal: { action: 'hideModal' },
    showModal: { action: 'showModal' },
  },
} as Meta

interface Props {
  voteForHandle: string
  hideModal: () => void
  showModal: () => void
}

const Template: Story<Props> = ({ voteForHandle, hideModal, showModal }) => {
  const modalData = { voteForHandle }
  return (
    <ModalContext.Provider value={{ modalData, modal: null, hideModal, showModal }}>
      <RevealVoteSuccessModal />
    </ModalContext.Provider>
  )
}

export const Default = Template.bind({})
Default.args = {
  voteForHandle: 'Dave',
}
