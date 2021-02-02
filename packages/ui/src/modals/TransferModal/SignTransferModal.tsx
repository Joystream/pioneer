import React, { useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { ISubmittableResult } from '@polkadot/types/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import BN from 'bn.js'

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
import { WaitForTheExtensionModal } from './WaitForTheExtensionModal'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
}

export function SignTransferModal({ onClose, from, amount, to }: Props) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const balanceFrom = useBalance(from)
  const balanceTo = useBalance(to)
  const [isSending, setIsSending] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const transfer = api?.tx?.balances?.transfer(to.address, amount)
  const info = useObservable(transfer?.paymentInfo(from.address), [api])

  useEffect(() => {
    if (!isSending || !transfer) {
      return
    }

    const keyringPair = keyring.getPair(from.address)

    const statusCallback = ({ status }: ISubmittableResult) => {
      if (!status.isInBlock) {
        console.log(`Current transaction status: ${status.type}`)
        return
      }

      console.log(`In Block. Block hash: ${status.asInBlock.toString()}`)
      onClose()
    }

    let subscription: Subscription

    if (keyringPair.meta.isInjected) {
      setIsWaiting(true)
      web3FromAddress(from.address).then(({ signer }) => {
        subscription = transfer.signAndSend(from.address, { signer: signer }).subscribe(statusCallback)
      })
    } else {
      subscription = transfer.signAndSend(keyringPair).subscribe(statusCallback)
    }

    return () => {
      subscription && subscription.unsubscribe()
    }
  }, [api, isSending])

  if (isWaiting) {
    return <WaitForTheExtensionModal />
  }

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
