import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalContextProvider } from '@/common/providers/modal/provider'

import { WithdrawWarningModal } from './WithdrawWarningModal'

export default {
  title: 'Council/WithdrawCandidacy/WithdrawWarningModal',
  component: WithdrawWarningModal,
} as Meta

const Template: Story = () => {
  return (
    <>
      <ModalContextProvider>
        <WithdrawWarningModal onNext={() => undefined} onClose={() => undefined} />
      </ModalContextProvider>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
