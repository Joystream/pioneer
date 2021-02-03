import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'
import { AccountInfo } from '../../components/AccountInfo'
import { ArrowDownExpandedIcon } from '../../components/icons/ArrowDownExpandedIcon'
import { Modal, ModalBody, ModalHeader } from '../../components/modal'
import { Text } from '../../components/page/Typography/Text'
import { TokenValue } from '../../components/TokenValue'
import { Account } from '../../hooks/types'
import { useBalance } from '../../hooks/useBalance'
import {
  AccountRow,
  BalanceInfo,
  InfoTitle,
  InfoValue,
  TransactionAmountInfo,
  TransactionAmountInfoText,
} from '../common'

interface Props {
  onClose: () => void
  from: Account
  to: Account
  amount: BN
}

export function TransactionSuccessModal({ onClose, from, to, amount }: Props) {
  const fromBalance = useBalance(from as Account)
  const toBalance = useBalance(to as Account)

  if (!fromBalance || !toBalance) {
    return <></>
  }

  const fromNow = fromBalance.transferable
  const fromBefore = fromNow.add(amount)

  const toNow = toBalance.total
  const toBefore = toNow.sub(amount)

  return (
    <Modal>
      <ModalHeader onClick={onClose} title="Success" icon={'🎉'} />
      <ModalSuccessBody>
        <Text>You have just successfully transferred balance from:</Text>
        <AccountSuccessRow>
          <AccountInfo account={from} />
          <BalanceInfo>
            <InfoTitle>Transferable balance before:</InfoTitle>
            <InfoValue>
              <TokenValue value={fromBefore} />
            </InfoValue>
            <InfoTitle>Transferable balance after:</InfoTitle>
            <InfoValue>
              <TokenValue value={fromNow} />
            </InfoValue>
          </BalanceInfo>
        </AccountSuccessRow>
        <TransactionAmountInfo>
          <ArrowDownExpandedIcon />
          <TransactionAmountInfoText>
            Transferred <TokenValue value={amount} />
          </TransactionAmountInfoText>
        </TransactionAmountInfo>
        <AccountSuccessRow>
          <AccountInfo account={to} />
          <BalanceInfo>
            <InfoTitle>Transferable balance before:</InfoTitle>
            <InfoValue>
              <TokenValue value={toBefore} />
            </InfoValue>
            <InfoTitle>Transferable balance after:</InfoTitle>
            <InfoValue>
              <TokenValue value={toNow} />
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
