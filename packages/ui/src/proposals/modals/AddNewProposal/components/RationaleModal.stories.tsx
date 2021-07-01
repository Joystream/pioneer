import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { info } from '@/common/logger'
import { RationaleModal } from '@/proposals/modals/AddNewProposal/components/RationaleModal'

export default {
  title: 'Proposals/AddNewProposalModal/RationaleModal',
  component: RationaleModal,
} as Meta

const Template: Story = () => {
  return (
    <MemoryRouter>
      <RationaleModal closeModal={() => info('close')} />
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
