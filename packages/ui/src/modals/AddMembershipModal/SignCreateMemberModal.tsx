import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import BN from 'bn.js'
import React, { useState } from 'react'
import { Member } from '../../common/types'
import { Button } from '../../components/buttons'
import { Label } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { SelectAccount } from '../../components/account/SelectAccount'
import { Text, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { WaitModal } from '../WaitModal'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  transactionParams: Member
  onDone: (result: boolean, fee: BN) => void
}

export const SignCreateMemberModal = ({ onClose, membershipPrice, transactionParams, onDone }: SignProps) => {
  const { api } = useApi()
  const [from, setFrom] = useState(transactionParams.controllerAccount)
  const transaction = api?.tx?.members?.buyMembership({
    root_account: transactionParams.rootAccount.address,
    controller_account: transactionParams.controllerAccount.address,
    name: transactionParams.name,
    handle: transactionParams.handle,
    avatar_uri: transactionParams.avatarURI,
    about: transactionParams.about,
  })

  const { paymentInfo, send, status } = useSignAndSendTransaction({ transaction, from, onDone })

  if (status === 'READY') {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize transaction" />
        <ModalBody>
          <Text>You are intend to create a new membership.</Text>
          <Text>
            The creation of the new membership costs <TokenValue value={membershipPrice?.toBn()} />.
          </Text>
          <Text>
            Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
          </Text>
          <Row>
            <Label>Sending from account</Label>
            <SelectAccount selected={from} onChange={(account) => setFrom(account)} />
          </Row>
        </ModalBody>
        <ModalFooter>
          <BalanceInfoNarrow>
            <InfoTitle>Creation fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={membershipPrice?.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={paymentInfo?.partialFee.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
          </BalanceInfoNarrow>
          <Button variant="primary" size="medium" onClick={send} disabled={status !== 'READY'}>
            Sign and create a member
          </Button>
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
