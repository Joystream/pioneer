import BN from 'bn.js'
import React from 'react'

import { ArrowDownExpandedIcon, SuccessIcon } from '../../../common/components/icons'
import {
  Modal,
  ModalHeader,
  SuccessModalBody,
  BalanceInfo,
  InfoTitle,
  InfoValue,
  LockedAccount,
  TransactionAmountInfo,
  TransactionAmountInfoText,
} from '../../../common/components/Modal'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { AccountInfo } from '../../components/AccountInfo'
import { useBalance } from '../../hooks/useBalance'
import { Account } from '../../types'

interface Props {
  onClose: () => void
  from: Account
  to: Account
  amount: BN
  fee: BN
}

export function TransferSuccessModal({ onClose, from, to, amount, fee }: Props) {
  const fromBalance = useBalance(from.address)
  const toBalance = useBalance(to.address)

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
        <TextMedium margin="l">You have just successfully transferred balance from</TextMedium>
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
