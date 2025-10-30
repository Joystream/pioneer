import { Meta, Story } from '@storybook/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ModalContext } from '@/common/providers/modal/context'
import { VotingAttempt } from '@/council/hooks/useCommitment'

import { SendVotePicked } from './machine'
import { PickVoteModal } from './PickVoteModal'

export default {
  title: 'Council/RevealVote/PickVoteModal',
  component: PickVoteModal,
  argTypes: {
    hideModal: { action: 'hideModal' },
    showModal: { action: 'showModal' },
  },
} as Meta

interface Props {
  votes: VotingAttempt[]
  hideModal: () => void
  showModal: () => void
}

const useAccounts: UseAccounts = {
  isLoading: false,
  allAccounts: [
    { name: 'Alice Account', address: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf' },
    { name: 'Bob Account', address: '5DWS57CtERHpNehXCPcNoHGKutQYGrwvaEF5zXb26Fz9rcQp' },
  ],
  hasAccounts: true,
  allWallets: [],
}

const Template: Story<Props> = ({ votes, hideModal, showModal }) => {
  const modalData = { voteForHandle: 'Dave' }
  const send = (() => undefined) as unknown as SendVotePicked
  return (
    <AccountsContext.Provider value={useAccounts}>
      <ModalContext.Provider value={{ modalData, modal: null, hideModal, showModal }}>
        <PickVoteModal send={send} votes={votes} />
      </ModalContext.Provider>
    </AccountsContext.Provider>
  )
}

export const Default = Template.bind({})
Default.args = {
  votes: [
    {
      salt: '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206',
      accountId: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
      optionId: '1',
    },
    {
      salt: '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206',
      accountId: '5DWS57CtERHpNehXCPcNoHGKutQYGrwvaEF5zXb26Fz9rcQp',
      optionId: '1',
    },
  ],
}
