import BN from 'bn.js'
import React, { useMemo } from 'react'

import { ButtonPrimary } from '../../../common/components/buttons'
import { Help } from '../../../common/components/Help'
import { ArrowDownExpandedIcon } from '../../../common/components/icons'
import { ModalBody, ModalFooter, SignTransferContainer } from '../../../common/components/Modal'
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
} from '../../../common/components/Modals'
import { TransactionModal } from '../../../common/components/TransactionModal'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { useApi } from '../../../common/hooks/useApi'
import { useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { onTransactionDone } from '../../../common/types'
import { AccountInfo } from '../../components/AccountInfo'
import { useBalance } from '../../hooks/useBalance'
import { Account } from '../../types'

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

  return (
    <TransactionModal status={status} onClose={onClose}>
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
    </TransactionModal>
  )
}
