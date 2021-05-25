import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { AddressToBalanceMap, Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { HelpIcon } from '@/common/components/icons'
import { Modal, ModalHeader, BalanceInfoInRow, InfoTitle, InfoValue, ModalFooter } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { spacing } from '@/common/utils/styles'

import { ModalBody, MemberRow } from './styles'

interface Props {
  onClose: () => void
  onManageAccountsClick: () => void
  requiredStake: number
  balances: AddressToBalanceMap
  accounts: Account[]
}

export const MoveFoundsTransferableModal = ({ onClose, onManageAccountsClick, requiredStake, balances, accounts }: Props) => {
  if (!accounts.length) {
    return null
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Move founds" />
      <ModalBody>
        <TextMedium margin="l">
          Unfortunately, you don’t have any accounts suitable for applying to this role. You need at least{' '}
          <TokenValue value={requiredStake} /> to apply for this role. Please move your funds.
        </TextMedium>
        <TextMedium margin="s" bold>
          Accounts with transferable balances:
        </TextMedium>
        <div>
          {accounts.map((account) => (
            <MemberRow key={account.address}>
              <AccountInfo account={account} />
              <BalanceInfoInRow>
                <InfoTitle>Transferable balance</InfoTitle>
                <InfoValue>
                  <TokenValue value={balances[account.address] && balances[account.address].transferable} />
                </InfoValue>
              </BalanceInfoInRow>
            </MemberRow>
          ))}
        </div>
        <Info>
          <h5>
            <HelpIcon />
            Info
          </h5>
          <p>You can combine balances in one of your account or transfer tokens into new account. </p>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onManageAccountsClick}>
          Manage your accounts
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

export const Info = styled.div`
  background-color: ${Colors.Blue[50]};
  padding: ${spacing(2)};
  margin-top: ${spacing(2)};

  h5 {
    display: flex;
    align-items: center;
    margin-bottom: ${spacing(1)};
  }

  svg {
    margin-right: ${spacing(1)};
  }
`
