import React from 'react'
import styled from 'styled-components'
import { AccountInfo } from '../../components/AccountInfo'
import { ArrowDownExpandedIcon } from '../../components/icons/ArrowDownExpandedIcon'
import { Modal, ModalBody, ModalHeader } from '../../components/modal'
import { Text } from '../../components/page/Typography/Text'
import { TokenValue } from '../../components/TokenValue'
import { useAccounts } from '../../hooks/useAccounts'
import {
  AccountRow,
  BalanceInfo,
  InfoTitle,
  InfoValue,
  TransactionAmountInfo,
  TransactionAmountInfoText,
} from './TransferModal'

export function TransactionSuccessModal() {
  const accounts = useAccounts()

  if (!accounts.hasAccounts) {
    return <></>
  }

  const [from, to] = accounts.allAccounts

  return (
    <Modal>
      <ModalHeader
        onClick={() => {
          /**/
        }}
        title="Success"
        icon={'🎉'}
      />
      <ModalSuccessBody>
        <Text>You have just successfully transferred balance from:</Text>
        <AccountSuccessRow>
          <AccountInfo account={from} />
          <BalanceInfo>
            <InfoTitle>Transferable balance before</InfoTitle>
            <InfoValue>
              <TokenValue value={100_000_000} />
            </InfoValue>
            <InfoTitle>Transferable balance after</InfoTitle>
            <InfoValue>
              <TokenValue value={0} />
            </InfoValue>
          </BalanceInfo>
        </AccountSuccessRow>
        <TransactionAmountInfo>
          <ArrowDownExpandedIcon />
          <TransactionAmountInfoText>
            {/* Transferred <TokenValue value={new BN(amount)} /> */}
          </TransactionAmountInfoText>
        </TransactionAmountInfo>
        <AccountSuccessRow>
          <AccountInfo account={to} />
          <BalanceInfo>
            <InfoTitle>Transferable balance before</InfoTitle>
            <InfoValue>
              <TokenValue value={0} />
            </InfoValue>
            <InfoTitle>Transferable balance after</InfoTitle>
            <InfoValue>
              <TokenValue value={50_000_000} />
            </InfoValue>
          </BalanceInfo>
        </AccountSuccessRow>
      </ModalSuccessBody>
    </Modal>
  )
}

const ModalSuccessBody = styled(ModalBody)`
  border: none;
`

const AccountSuccessRow = styled(AccountRow)`
  padding: 16px 14px;
`
