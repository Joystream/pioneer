import { Meta, Story } from '@storybook/react'
import React from 'react'

import { info } from '@/common/logger'
import { RationaleModal } from '@/proposals/modals/AddNewProposal/components/RationaleModal'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/RationaleModal',
  component: RationaleModal,
} as Meta

const Template: Story = () => {
  return <RationaleModal closeModal={() => info('close')} />
}

export const Default = Template.bind({})
