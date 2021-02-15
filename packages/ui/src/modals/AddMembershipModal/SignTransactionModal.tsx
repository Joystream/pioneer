import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import React from 'react'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { Label } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { SelectAccount } from '../../components/selects/SelectAccount'
import { Text, TokenValue } from '../../components/typography'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
}

export const SignTransactionModal = ({ onClose, membershipPrice }: SignProps) => {
  const transactionFee = 0
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
          <SelectAccount onChange={() => undefined} />
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
