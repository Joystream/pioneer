import { web3FromAddress } from '@polkadot/extension-dapp'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { Observable } from 'rxjs'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { Label } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { SelectAccount } from '../../components/selects/SelectAccount'
import { Text, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useKeyring } from '../../hooks/useKeyring'
import { useObservable } from '../../hooks/useObservable'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { Params } from './MembershipFormModal'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  transactionParams: Params
  onSign: (transaction: Observable<ISubmittableResult>, fee: BN) => void
}

export const SignTransactionModal = ({ onClose, membershipPrice, transactionParams, onSign }: SignProps) => {
  const { api } = useApi()
  const keyring = useKeyring()
  const [from, setFrom] = useState(transactionParams.controllerAccount)
  const transfer = api?.tx?.members?.buyMembership({
    root_account: transactionParams.rootAccount.address,
    controller_account: transactionParams.controllerAccount.address,
    name: transactionParams.name,
    handle: transactionParams.handle,
    avatar_uri: transactionParams.avatar,
    about: transactionParams.about,
  })
  const info = useObservable(transfer?.paymentInfo(from.address), [api, from])
  const [isSending, setSending] = useState(false)

  useEffect(() => {
    if (!isSending || !transfer || !info) {
      return
    }

    const keyringPair = keyring.getPair(from.address)
    const fee = info.partialFee.toBn()

    if (keyringPair.meta.isInjected) {
      web3FromAddress(from.address).then(({ signer }) => {
        onSign(transfer.signAndSend(from.address, { signer: signer }), fee)
      })
    } else {
      onSign(transfer.signAndSend(keyringPair), fee)
    }
  }, [api, isSending])
  const transactionFee = info?.partialFee

  return (
    <Modal modalSize="m" modalHeight="s">
      <ModalHeader onClick={onClose} title="Authorize transaction" />
      <ModalBody>
        <Text>You are intend to create a new membership</Text>
        <Text>
          The creation of the new membership costs <TokenValue value={membershipPrice} />
        </Text>
        <Text>
          Fees of <TokenValue value={transactionFee} /> will be applied to the transaction
        </Text>
        <Row>
          <Label>Sending from account</Label>
          <SelectAccount onChange={(account) => setFrom(account)} />
        </Row>
      </ModalBody>
      <ModalFooter>
        <BalanceInfoNarrow>
          <InfoTitle>Creation fee:</InfoTitle>
          <InfoValue>
            <TokenValue value={membershipPrice} />
          </InfoValue>
          <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
          <InfoTitle>Transaction fee:</InfoTitle>
          <InfoValue>
            <TokenValue value={transactionFee} />
          </InfoValue>
          <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
        </BalanceInfoNarrow>
        <ButtonPrimaryMedium
          onClick={() => {
            setSending(true)
          }}
          disabled={isSending}
        >
          Sign and create a member
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
