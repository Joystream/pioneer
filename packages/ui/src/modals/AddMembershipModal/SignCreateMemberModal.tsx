import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useState } from 'react'
import { Observable } from 'rxjs'
import { Member } from '../../common/types'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { Label } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { SelectAccount } from '../../components/selects/SelectAccount'
import { Text, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  transactionParams: Member
  onSign: (transaction: Observable<ISubmittableResult>, fee: BN) => void
}

export const SignCreateMemberModal = ({ onClose, membershipPrice, transactionParams, onSign }: SignProps) => {
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
  const { paymentInfo, isSending, send } = useSignAndSendTransaction({ transaction, from, onSign })

  return (
    <Modal modalSize="m" modalHeight="s">
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
        <ButtonPrimaryMedium onClick={send} disabled={isSending}>
          Sign and create a member
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
