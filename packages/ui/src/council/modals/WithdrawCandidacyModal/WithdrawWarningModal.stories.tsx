import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ModalContextProvider } from '@/common/providers/modal/provider'

import { WithdrawWarningModal } from './WithdrawWarningModal'

export default {
  title: 'Council/WithdrawCandidacy/WithdrawWarningModal',
  component: WithdrawWarningModal,
} as Meta

const Template: Story = () => {
  return (
    <>
      <MemoryRouter>
        <ModalContextProvider>
          <WithdrawWarningModal onNext={() => undefined} onClose={() => undefined} />
        </ModalContextProvider>
      </MemoryRouter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
