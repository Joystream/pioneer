import BN from 'bn.js'
import React, { useEffect } from 'react'
import { Account } from '../../common/types'
import { AccountInfo } from '../../components/AccountInfo'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { Help } from '../../components/Help'
import { ArrowDownExpandedIcon } from '../../components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader, SignTransferContainer } from '../../components/Modal'
import { TokenValue } from '../../components/typography'
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
  TransactionInfoLabel,
} from '../common'
import { WaitModal } from '../WaitModal'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
  onDone: (result: boolean, fee: BN) => void
}

export function SignTransferModal({ onClose, from, amount, to, onDone }: Props) {
  const balanceFrom = useBalance(from)
  const balanceTo = useBalance(to)
  const { api } = useApi()
  const transaction = api?.tx?.balances?.transfer(to.address, amount)
  const { paymentInfo, send, status } = useSignAndSendTransaction({ transaction, from })

  // TODO: move onDone to useSignAndSend?
  useEffect(() => {
    const isDone = status === 'SUCCESS' || status === 'ERROR'

    isDone && onDone(status === 'SUCCESS', paymentInfo?.partialFee?.toBn() || new BN(0))
  })

  if (status === 'READY') {
    return (
      <Modal modalSize="m"  onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize Transaction" />
        <ModalBody>
          <SignTransferContainer>
            <Row>
              <TransactionInfoLabel>
                You are transferring <TokenValue value={amount} /> stake from “{from.name}” account to “{to.name}”{' '}
                destination.
              </TransactionInfoLabel>
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
              />
            </BalanceInfoNarrow>
          </TransactionInfo>
          <ButtonPrimaryMedium onClick={send} disabled={status !== 'READY'}>
            Sign transaction and Transfer
          </ButtonPrimaryMedium>
        </ModalFooter>
      </Modal>
    )
  }

  if (status === 'EXTENSION') {
    return (
      <WaitModal onClose={onClose}
        title="Waiting for the extension"
        description="Please, sign the transaction using external signer app."
      />
    )
  }

  if (status === 'PENDING') {
    return (
      <WaitModal onClose={onClose}
        title="Pending transaction"
        description="We are waiting for your transaction to be mined. It can takes Lorem ipsum deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim."
      />
    )
  }

  return null
}
