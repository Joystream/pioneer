import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { List, ListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'
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
      <ModalHeader title="Pick vote" onClick={hideModal} />
      <ModalBody>
        <TextMedium light>Choose the vote you want to reveal.</TextMedium>
        <List>
          {votes.map((vote) => (
            <ListItem key={vote.accountId} onClick={() => send('PICKED', { vote })} borderless>
              <AccountItemWrapper>
                <AccountInfo account={accountOrNamed(allAccounts, vote.accountId, 'Account')} />
              </AccountItemWrapper>
            </ListItem>
          ))}
        </List>
      </ModalBody>
    </Modal>
  )
}

const AccountItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};
  padding: 16px 8px 16px 16px;

  ${TableListItemAsLinkHover}
`
