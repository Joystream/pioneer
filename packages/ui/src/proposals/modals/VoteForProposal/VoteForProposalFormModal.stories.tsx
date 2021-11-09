import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ModalContext } from '@/common/providers/modal/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { VoteForProposalModalForm } from './VoteForProposalModalForm'
import {useProposal} from "@/proposals/hooks/useProposal";

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

const ConnectedVoteForProposalModalForm = ({id}: {id: string }) => {
  const { proposal, isLoading } = useProposal(id)
  console.log({ proposal, isLoading })
  return (
    <VoteForProposalModalForm
      onNext={() => true}
      setRationale={() => true}
      setStatus={() => true}
      proposalTitle={proposal?.title || ''}
      proposalType={proposal?.type || ''}
      proposalRationale={proposal?.rationale || ''}
      proposalDetails={proposal?.details}
    />
  )
}

const Template: Story<Props> = ({ id, hideModal, showModal }) => {
  const modalData = { id }
  return (
    <MemoryRouter>
      <MockApolloProvider members council proposals workingGroups workers>
        <ModalContext.Provider value={{ modalData, modal: null, hideModal, showModal }}>
          <ConnectedVoteForProposalModalForm id={id} />
        </ModalContext.Provider>
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {
  id: '0',
}
