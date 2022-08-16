import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { VoteForCouncilMachineState } from '@/council/modals/VoteForCouncil/machine'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { VoteForCouncilFormModal, VoteForCouncilFormModalProps } from './VoteForCouncilFormModal'

export default {
  title: 'Council/VoteForCouncil/VoteForCouncilFormModal',
  component: VoteForCouncilFormModal,
  argTypes: {
    send: { action: 'send' },
    hideModal: { action: 'hideModal' },
    showModal: { action: 'showModal' },
  },
} as Meta

interface Props extends Omit<VoteForCouncilFormModalProps, 'minStake'> {
  id: string
  minStake: number
  hideModal: () => void
  showModal: () => void
  state: VoteForCouncilMachineState
}

const Template: Story<Props> = ({ minStake, id, send, hideModal, showModal, state }) => {
  const modalData = { id }
  return (
    <MockApolloProvider members council>
      <ModalContext.Provider value={{ modalData, modal: null, hideModal, showModal }}>
        <VoteForCouncilFormModal minStake={new BN(minStake)} send={send} state={state} />
      </ModalContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  id: '0-0',
  minStake: 100_000,
}
