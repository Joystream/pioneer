import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { useApi } from '@/api/hooks/useApi'
import { ArrowDownExpandedIcon } from '@/common/components/icons'
import {
  BalanceInfoInRow,
  InfoTitle,
  InfoValue,
  LockedAccount,
  ModalBody,
  ModalTransactionFooter,
  Row,
  SignTransferContainer,
  TransactionAmountInfo,
  TransactionAmountInfoText,
} from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'

import { AccountInfo } from '../../components/AccountInfo'
import { useBalance } from '../../hooks/useBalance'
import { Account } from '../../types'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
  service: ActorRef<any>
  transactionFactory?: (amount: BN) => SubmittableExtrinsic<'rxjs', ISubmittableResult>
}

export function TransferSignModal({ onClose, from, amount, to, service, transactionFactory }: Props) {
  const toAddress = to.address
  const fromAddress = from.address
  const balanceFrom = useBalance(fromAddress)
  const balanceTo = useBalance(toAddress)
  const { api, connectionState } = useApi()

  const transaction = useMemo(
    () => (transactionFactory ? transactionFactory(amount) : api?.tx?.balances?.transfer(toAddress, amount)),
    [toAddress, amount, connectionState, transactionFactory]
  )
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: fromAddress,
    service,
    skipQueryNode: true,
  })

  const isDisabled = !isReady || balanceFrom?.transferable.lt(amount.add(paymentInfo?.partialFee || BN_ZERO))

  return (
    <TransactionModal service={service} onClose={onClose}>
      <ModalBody>
        <SignTransferContainer>
          <Row>
            <TextMedium margin="xl">
              You are transferring <TokenValue value={amount} /> stake from “{from.name}” account to “{to.name}”{' '}
              destination.
            </TextMedium>
            <LockedAccount>
              <AccountInfo account={from} />
              <BalanceInfoInRow>
                <InfoTitle>Transferable balance</InfoTitle>
                <InfoValue>
                  <TokenValue value={balanceFrom?.transferable} />
                </InfoValue>
              </BalanceInfoInRow>
            </LockedAccount>
          </Row>
          <TransactionAmountInfo>
            <ArrowDownExpandedIcon />
            <TransactionAmountInfoText>
              Transferring <TokenValue value={amount} />
            </TransactionAmountInfoText>
          </TransactionAmountInfo>
          <Row>
            <LockedAccount>
              <AccountInfo account={to} />
              <BalanceInfoInRow>
                <InfoTitle>Transferable balance</InfoTitle>
                <InfoValue>
                  <TokenValue value={balanceTo?.transferable} />
                </InfoValue>
              </BalanceInfoInRow>
            </LockedAccount>
          </Row>
        </SignTransferContainer>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        next={{ disabled: isDisabled, label: 'Sign transaction and Transfer', onClick: sign }}
      >
        <TransactionInfo title="Amount:" value={amount} />
      </ModalTransactionFooter>
    </TransactionModal>
  )
}
