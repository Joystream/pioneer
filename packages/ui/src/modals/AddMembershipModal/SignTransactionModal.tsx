import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import React, { useState } from 'react'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { Label } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { SelectAccount } from '../../components/selects/SelectAccount'
import { Text, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useObservable } from '../../hooks/useObservable'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { Params } from './MembershipFormModal'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  transactionParams: Params
}

export const SignTransactionModal = ({ onClose, membershipPrice, transactionParams }: SignProps) => {
  const { api } = useApi()
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
        <ButtonPrimaryMedium>Sign and create a member</ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
