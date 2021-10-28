import React from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { AccountItem } from '@/app/pages/Profile/components/AccountItem'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { VotingAttempt } from '@/council/hooks/useCommitment'

import { SendVotePicked } from './machine'

interface Props {
  votes: VotingAttempt[]
  send: SendVotePicked
}

export const PickVoteModal = ({ votes, send }: Props) => {
  const { hideModal } = useModal()
  const { allAccounts } = useMyAccounts()
  return (
    <Modal modalSize="xs" modalHeight="s" onClose={hideModal}>
      <ModalHeader title="" onClick={hideModal} modalHeaderSize="s" />
      <ModalBody>
        <TextMedium light>Choose the vote you want to reveal.</TextMedium>
        <AccountsList>
          {votes.map((vote) => (
            <AccountOptionItem key={vote.accountId} onClick={() => send('PICKED', { vote })}>
              <AccountItem account={accountOrNamed(allAccounts, vote.accountId, 'Account')} />
            </AccountOptionItem>
          ))}
        </AccountsList>
      </ModalBody>
    </Modal>
  )
}

const AccountsList = styled.ul<{ memberIndicatorOffset?: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: -16px;
  padding-left: 16px;
  overflow: hidden;
  overflow-y: scroll;
`

const AccountOptionItem = styled.li`
  display: grid;
  position: relative;
`
