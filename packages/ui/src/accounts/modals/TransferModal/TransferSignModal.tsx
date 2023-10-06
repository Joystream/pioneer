import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ActorRef } from 'xstate'

import { useApi } from '@/api/hooks/useApi'
import { ArrowDownExpandedIcon } from '@/common/components/icons'
import { AlertSymbol } from '@/common/components/icons/symbols'
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
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
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
  const canAfford = balanceFrom?.transferable.gte(amount.add(paymentInfo?.partialFee || BN_ZERO))
  const isDisabled = !isReady || !canAfford || !paymentInfo?.partialFee

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
          {!canAfford && (
            <ErrorBox gap={5}>
              <AlertSymbol />
              <TextMedium error>Insufficient funds to cover transaction fees.</TextMedium>
            </ErrorBox>
          )}
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

const ErrorBox = styled(ColumnGapBlock)`
  background-color: ${Colors.Blue[50]};
  position: relative;
  padding: 16px;
  width: auto;
  align-items: center;
  justify-content: flex-start;
  path {
    fill: ${Colors.Red[500]}!important;
  }
`
