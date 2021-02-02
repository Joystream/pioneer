import { web3FromAddress } from '@polkadot/extension-dapp'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { Observable } from 'rxjs'

import { AccountInfo } from '../../components/AccountInfo'
import { ButtonPrimaryMedium } from '../../components/buttons/Buttons'
import { ArrowDownExpandedIcon } from '../../components/icons/ArrowDownExpandedIcon'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/modal'
import { HelpNotification } from '../../components/notifications/HelpNotification'
import { TokenValue } from '../../components/TokenValue'
import { Account } from '../../hooks/types'
import { useApi } from '../../hooks/useApi'
import { useBalance } from '../../hooks/useBalance'
import { useKeyring } from '../../hooks/useKeyring'
import { useObservable } from '../../hooks/useObservable'
import {
  AccountRow,
  BalanceInfo,
  FormLabel,
  InfoTitle,
  InfoValue,
  Row,
  TransactionAmountInfo,
  TransactionAmountInfoText,
  TransactionInfo,
} from './TransferModal'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
  onSign: (transaction: Observable<ISubmittableResult>) => void
}

export function SignTransferModal({ onClose, from, amount, to, onSign }: Props) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const balanceFrom = useBalance(from)
  const balanceTo = useBalance(to)
  const [isSending, setIsSending] = useState(false)
  const transfer = api?.tx?.balances?.transfer(to.address, amount)
  const info = useObservable(transfer?.paymentInfo(from.address), [api])

  useEffect(() => {
    if (!isSending || !transfer) {
      return
    }

    const keyringPair = keyring.getPair(from.address)

    if (keyringPair.meta.isInjected) {
      web3FromAddress(from.address).then(({ signer }) => {
        onSign(transfer.signAndSend(from.address, { signer: signer }))
      })
    } else {
      onSign(transfer.signAndSend(keyringPair))
    }
  }, [api, isSending])

  return (
    <Modal>
      <ModalHeader onClick={onClose} title="Authorize transaction" />
      <ModalBody>
        <Row>
          <FormLabel>From</FormLabel>
          <AccountRow>
            <AccountInfo account={from} />
            <BalanceInfo>
              <InfoTitle>Transferable balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balanceFrom?.transferable} />
              </InfoValue>
            </BalanceInfo>
          </AccountRow>
        </Row>
        <TransactionAmountInfo>
          <ArrowDownExpandedIcon />
          <TransactionAmountInfoText>
            Transferring <TokenValue value={new BN(amount)} />
          </TransactionAmountInfoText>
        </TransactionAmountInfo>
        <Row>
          <FormLabel>Destination account</FormLabel>
          <AccountRow>
            <AccountInfo account={to} />
            <BalanceInfo>
              <InfoTitle>Total balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balanceTo?.total} />
              </InfoValue>
            </BalanceInfo>
          </AccountRow>
        </Row>
      </ModalBody>
      <ModalFooter>
        <TransactionInfo>
          <BalanceInfo>
            <InfoTitle>Amount:</InfoTitle>
            <InfoValue>
              <TokenValue value={new BN(amount)} />
            </InfoValue>
          </BalanceInfo>
          <BalanceInfo>
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={info?.partialFee.toBn()} />
            </InfoValue>
            <HelpNotification
              helperText={
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora mollitia necessitatibus, eos recusandae obcaecati facilis sed maiores. Impedit iusto expedita natus perspiciatis, perferendis totam commodi ad, illo, veritatis omnis beatae.Facilis natus recusandae, magni saepe hic veniam aliquid tempore quia assumenda voluptatum reprehenderit. Officiis provident nam corrupti, incidunt, repudiandae accusantium porro libero ipsam illo quae ratione. Beatae itaque quo quidem.'
              }
            />
          </BalanceInfo>
        </TransactionInfo>
        <ButtonPrimaryMedium onClick={() => setIsSending(true)} disabled={isSending}>
          Sign transaction and Transfer
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
