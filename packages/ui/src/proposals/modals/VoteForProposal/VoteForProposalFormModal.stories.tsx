import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import rawProposals from '@/mocks/data/raw/proposals.json'
import { ProposalWithDetails } from '@/proposals/types'

import { VoteForProposalModalForm } from './VoteForProposalModalForm'

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

const Template: Story<Props> = () => {
  return (
    <MemoryRouter>
      <MockApolloProvider members council proposals workingGroups workers>
        <VoteForProposalModalForm
          context={{}}
          send={() => undefined}
          proposal={rawProposals[0] as unknown as ProposalWithDetails}
        />
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
