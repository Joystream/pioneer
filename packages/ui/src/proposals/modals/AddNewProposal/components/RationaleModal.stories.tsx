import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ModalContextProvider } from '@/common/providers/modal/provider'
import { RationaleModal } from '@/proposals/modals/AddNewProposal/components/RationaleModal'

export default {
  title: 'Proposals/AddNewProposalModal/RationaleModal',
  component: RationaleModal,
} as Meta

const Template: Story = () => {
  return (
    <MemoryRouter>
      <ModalContextProvider>
        <RationaleModal />
      </ModalContextProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
