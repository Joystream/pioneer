import { RuntimeDispatchInfo } from '@polkadot/types/interfaces'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { AccountInfo } from '../../components/AccountInfo'
import { ButtonPrimaryMedium } from '../../components/buttons/Buttons'
import { ArrowDownExpandedIcon } from '../../components/icons/ArrowDownExpandedIcon'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/modal'
import { TokenValue } from '../../components/TokenValue'
import { Account } from '../../hooks/types'
import { useApi } from '../../hooks/useApi'
import { useBalances } from '../../hooks/useBalances'
import { useKeyring } from '../../hooks/useKeyring'
import {
  AccountRow,
  FormLabel,
  InfoTitle,
  InfoValue,
  Row,
  TransactionAmountInfo,
  TransactionAmountInfoText,
  TransactionInfo,
  TransactionInfoRow
} from './TransferModal'
import { HelpNotification } from '../../components/notifications/HelpNotification'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
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
      <ModalHeader onClick={onClose} title="Authorize transaction" />
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
            <HelpNotification
              helperText={
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora mollitia necessitatibus, eos recusandae obcaecati facilis sed maiores. Impedit iusto expedita natus perspiciatis, perferendis totam commodi ad, illo, veritatis omnis beatae.Facilis natus recusandae, magni saepe hic veniam aliquid tempore quia assumenda voluptatum reprehenderit. Officiis provident nam corrupti, incidunt, repudiandae accusantium porro libero ipsam illo quae ratione. Beatae itaque quo quidem.'
              }
            />
          </TransactionInfoRow>
        </TransactionInfo>
        <ButtonPrimaryMedium onClick={signAndSend} disabled={isSending}>
          Sign transaction and Transfer
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
