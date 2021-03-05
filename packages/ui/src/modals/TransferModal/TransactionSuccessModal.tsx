import BN from 'bn.js'
import React from 'react'
import { AccountInfo } from '../../components/AccountInfo'
import { ArrowDownExpandedIcon, SuccessIcon } from '../../components/icons'
import { Modal, ModalHeader, SuccessModalBody } from '../../components/Modal'
import { TokenValue } from '../../components/typography'
import { Account } from '../../common/types'
import { useBalance } from '../../hooks/useBalance'
import {
  BalanceInfo,
  InfoTitle,
  InfoValue,
  LockedAccount,
  TransactionAmountInfo,
  TransactionAmountInfoText,
  TransactionInfoLabel,
} from '../common'

interface Props {
  onClose: () => void
  from: Account
  to: Account
  amount: BN
  fee: BN
}

export function TransactionSuccessModal({ onClose, from, to, amount, fee }: Props) {
  const fromBalance = useBalance(from as Account)
  const toBalance = useBalance(to as Account)

  if (!fromBalance || !toBalance) {
    return <></>
  }

  const fromNow = fromBalance.transferable
  const fromBefore = fromNow.add(amount).add(fee)

  const toNow = toBalance.transferable
  const toBefore = toNow.sub(amount)

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <SuccessModalBody>
        <TransactionInfoLabel style={{ marginBottom: '28px', justifySelf: 'start' }}>
          You have just successfully transferred balance from
        </TransactionInfoLabel>
        <LockedAccount>
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
        </LockedAccount>
        <TransactionAmountInfo>
          <ArrowDownExpandedIcon />
          <TransactionAmountInfoText>
            Transferred <TokenValue value={amount} />
          </TransactionAmountInfoText>
        </TransactionAmountInfo>
        <LockedAccount>
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
        </LockedAccount>
      </SuccessModalBody>
    </Modal>
  )
}
