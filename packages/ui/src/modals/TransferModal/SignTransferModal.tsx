import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React from 'react'
import { Observable } from 'rxjs'
import { AccountInfo } from '../../components/AccountInfo'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { Help } from '../../components/Help'
import { ArrowDownExpandedIcon } from '../../components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader, SignTransferContainer } from '../../components/Modal'
import { TokenValue } from '../../components/typography'
import { Account } from '../../hooks/types'
import { useApi } from '../../hooks/useApi'
import { useBalance } from '../../hooks/useBalance'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import {
  BalanceInfo,
  InfoTitle,
  InfoValue,
  LockedAccount,
  Row,
  TransactionAmountInfo,
  TransactionAmountInfoText,
  TransactionInfo,
  TransactionInfoLabel,
} from '../common'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
  onSign: (transaction: Observable<ISubmittableResult>, fee: BN) => void
}

export function SignTransferModal({ onClose, from, amount, to, onSign }: Props) {
  const balanceFrom = useBalance(from)
  const balanceTo = useBalance(to)
  const { api } = useApi()
  const transfer = api?.tx?.balances?.transfer(to.address, amount)
  const { isSending, paymentInfo, send } = useSignAndSendTransaction({ transaction: transfer, from, onSign })

  return (
    <Modal modalSize="m">
      <ModalHeader onClick={onClose} title="Authorize transaction" />
      <ModalBody>
        <SignTransferContainer>
          <Row>
            <TransactionInfoLabel>
              You are transferring <TokenValue value={amount} /> stake from {from.name} account to {to.name}{' '}
              destination.
            </TransactionInfoLabel>
            <LockedAccount>
              <AccountInfo account={from} />
              <BalanceInfo>
                <InfoTitle>Transferable balance</InfoTitle>
                <InfoValue>
                  <TokenValue value={balanceFrom?.transferable} />
                </InfoValue>
              </BalanceInfo>
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
              <BalanceInfo>
                <InfoTitle>Transferable balance</InfoTitle>
                <InfoValue>
                  <TokenValue value={balanceTo?.transferable} />
                </InfoValue>
              </BalanceInfo>
            </LockedAccount>
          </Row>
        </SignTransferContainer>
      </ModalBody>
      <ModalFooter>
        <TransactionInfo>
          <BalanceInfo>
            <InfoTitle>Amount:</InfoTitle>
            <InfoValue>
              <TokenValue value={amount} />
            </InfoValue>
          </BalanceInfo>
          <BalanceInfo>
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={paymentInfo?.partialFee.toBn()} />
            </InfoValue>
            <Help
              helperText={
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora mollitia necessitatibus, eos recusandae obcaecati facilis sed maiores. Impedit iusto expedita natus perspiciatis, perferendis totam commodi ad, illo, veritatis omnis beatae.Facilis natus recusandae, magni saepe hic veniam aliquid tempore quia assumenda voluptatum reprehenderit. Officiis provident nam corrupti, incidunt, repudiandae accusantium porro libero ipsam illo quae ratione. Beatae itaque quo quidem.'
              }
            />
          </BalanceInfo>
        </TransactionInfo>
        <ButtonPrimaryMedium onClick={send} disabled={isSending}>
          Sign transaction and Transfer
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
