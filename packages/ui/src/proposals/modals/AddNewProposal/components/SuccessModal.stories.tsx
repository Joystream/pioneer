import { Meta, Story } from '@storybook/react'
import React from 'react'

import { info } from '@/common/logger'
import { SuccessModal } from '@/proposals/modals/AddNewProposal/components/SuccessModal'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/SuccessModal',
  component: SuccessModal,
} as Meta

const Template: Story = () => {
  return (
    <SuccessModal
      onClose={() => info('close')}
      proposalId={1}
      proposalType="fundingRequest"
      proposalTitle="Lorem ipsum..."
    />
  )
}

export const Default = Template.bind({})
