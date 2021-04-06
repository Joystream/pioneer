import BN from 'bn.js'
import React, { useMemo } from 'react'

import { Account, onTransactionDone } from '../../common/types'
import { AccountInfo } from '../../components/AccountInfo'
import { ButtonPrimary } from '../../components/buttons'
import { Help } from '../../components/Help'
import { ArrowDownExpandedIcon } from '../../components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader, SignTransferContainer } from '../../components/Modal'
import { TextMedium, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useBalance } from '../../hooks/useBalance'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import {
  BalanceInfoInRow,
  BalanceInfoNarrow,
  InfoTitle,
  InfoValue,
  LockedAccount,
  Row,
  TransactionAmountInfo,
  TransactionAmountInfoText,
  TransactionInfo,
} from '../common'
import { WaitModal } from '../WaitModal'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
  onDone: onTransactionDone
}

export function TransferSignModal({ onClose, from, amount, to, onDone }: Props) {
  const toAddress = to.address
  const fromAddress = from.address
  const balanceFrom = useBalance(fromAddress)
  const balanceTo = useBalance(toAddress)
  const { api } = useApi()
  const transaction = useMemo(() => api?.tx?.balances?.transfer(toAddress, amount), [toAddress, amount])
  const { paymentInfo, send, status } = useSignAndSendTransaction({ transaction, signer: fromAddress, onDone })

  if (status === 'READY') {
    return (
      <Modal modalSize="m" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize Transaction" />
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
        <ModalFooter>
          <TransactionInfo>
            <BalanceInfoNarrow>
              <InfoTitle>Amount:</InfoTitle>
              <InfoValue>
                <TokenValue value={amount} />
              </InfoValue>
            </BalanceInfoNarrow>
            <BalanceInfoNarrow>
              <InfoTitle>Transaction fee:</InfoTitle>
              <InfoValue>
                <TokenValue value={paymentInfo?.partialFee.toBn()} />
              </InfoValue>
              <Help
                helperText={
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora mollitia necessitatibus, eos recusandae obcaecati facilis sed maiores. Impedit iusto expedita natus perspiciatis, perferendis totam commodi ad, illo, veritatis omnis beatae.Facilis natus recusandae, magni saepe hic veniam aliquid tempore quia assumenda voluptatum reprehenderit. Officiis provident nam corrupti, incidunt, repudiandae accusantium porro libero ipsam illo quae ratione. Beatae itaque quo quidem.'
                }
                absolute
              />
            </BalanceInfoNarrow>
          </TransactionInfo>
          <ButtonPrimary size="medium" onClick={send} disabled={status !== 'READY'}>
            Sign transaction and Transfer
          </ButtonPrimary>
        </ModalFooter>
      </Modal>
    )
  }

  if (status === 'EXTENSION') {
    return (
      <WaitModal
        onClose={onClose}
        title="Waiting for the extension"
        description="Please, sign the transaction using external signer app."
      />
    )
  }

  if (status === 'PENDING') {
    return (
      <WaitModal
        onClose={onClose}
        title="Pending transaction"
        description="We are waiting for your transaction to be mined. It can takes Lorem ipsum deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim."
      />
    )
  }

  return null
}
