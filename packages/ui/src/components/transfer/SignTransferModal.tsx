import React, { useEffect, useState } from 'react'
import { RuntimeDispatchInfo } from '@polkadot/types/interfaces'
import BN from 'bn.js'
import { useApi } from '../../hooks/useApi'
import { useKeyring } from '../../hooks/useKeyring'
import { useBalances } from '../../hooks/useBalances'
import { Account } from '../../hooks/types'
import { ButtonPrimaryMedium } from '../buttons/Buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../modal'
import { AccountInfo } from '../AccountInfo'
import { TokenValue } from '../TokenValue'
import {
  AccountRow,
  FormLabel,
  InfoTitle,
  InfoValue,
  Row,
  TransactionAmount,
  TransactionInfo,
  TransactionInfoRow,
} from '../TransferModal'

interface Props {
  onClose: () => void
  from: Account
  amount: string
  to: Account
}

export function SignTransferModal({ onClose, from, amount, to }: Props) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const balances = useBalances([from, to])
  const [isSending, setIsSending] = useState(false)
  const [info, setInfo] = useState<RuntimeDispatchInfo | null>(null)

  useEffect(() => {
    submittableExtrinsic?.paymentInfo(from.address).then((info) => {
      setInfo(info)
    })
  }, [api, amount])

  const submittableExtrinsic = api?.tx.balances.transfer(to.address, amount)
  const signAndSend = async () => {
    setIsSending(true)

    if (!submittableExtrinsic) {
      return
    }

    await submittableExtrinsic
      .signAndSend(keyring.getPair(from.address), (result) => {
        const { status } = result

        if (status.isFinalized) {
          onClose()
        }

        status.isFinalized
          ? console.log(`Finalized. Block hash: ${status.asFinalized.toString()}`)
          : console.log(`Current transaction status: ${status.type}`)
      })
      .catch((error) => console.log('Error', error))
  }

  return (
    <Modal>
      <ModalHeader onClick={onClose} title={"'Authorize transaction'"} />
      <ModalBody>
        <Row>
          <FormLabel>From</FormLabel>
          <AccountRow>
            <AccountInfo account={from} />
            <TransactionInfoRow>
              <InfoTitle>Transferable balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balances?.map[from.address]?.total} />
              </InfoValue>
            </TransactionInfoRow>
          </AccountRow>
        </Row>
        <TransactionAmount>
          Transferring <TokenValue value={new BN(amount)} />
        </TransactionAmount>
        <Row>
          <FormLabel>Destination account</FormLabel>
          <AccountRow>
            <AccountInfo account={to} />
            <TransactionInfoRow>
              <InfoTitle>Total balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balances?.map[to.address]?.total} />
              </InfoValue>
            </TransactionInfoRow>
          </AccountRow>
        </Row>
      </ModalBody>
      <ModalFooter>
        <TransactionInfo>
          <TransactionInfoRow>
            <InfoTitle>Amount:</InfoTitle>
            <InfoValue>
              <TokenValue value={new BN(amount)} />
            </InfoValue>
          </TransactionInfoRow>
          <TransactionInfoRow>
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={info?.partialFee.toBn()} />
            </InfoValue>
          </TransactionInfoRow>
        </TransactionInfo>
        <ButtonPrimaryMedium onClick={signAndSend} disabled={isSending}>
          Sign transaction and Transfer
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
