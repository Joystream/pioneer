import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ModalContext } from '@/common/providers/modal/context'
import { getMockAsOpening } from '@/mocks/data/seedOpenings'

import { WithdrawWarningModal } from './WithdrawWarningModal'

export default {
  title: 'Council/WithdrawCandidacy/WithdrawWarningModal',
  component: WithdrawWarningModal,
} as Meta

const Template: Story = () => {
  return (
    <>
      <MemoryRouter>
        <ModalContext.Provider
          value={{
            modalData: {
              opening: getMockAsOpening(),
            },
            showModal: () => undefined,
            hideModal: () => undefined,
            modal: null,
          }}
        >
          <WithdrawWarningModal onNext={() => undefined} onClose={() => undefined} />
        </ModalContext.Provider>
      </MemoryRouter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
