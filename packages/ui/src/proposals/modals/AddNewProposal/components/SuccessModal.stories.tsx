import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { info } from '@/common/logger'
import { SuccessModal } from '@/proposals/modals/AddNewProposal/components/SuccessModal'

export default {
  title: 'Proposals/AddNewProposalModal/SuccessModal',
  component: SuccessModal,
} as Meta

const Template: Story = () => {
  return (
    <MemoryRouter>
      <SuccessModal onClose={() => info('close')} proposalType="fundingRequest" proposalTitle="Lorem ipsum..." />
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
