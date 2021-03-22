import BN from 'bn.js'
import React, { useMemo } from 'react'
import { Account, Address, BaseMember } from '../../common/types'
import { SelectedAccount } from '../../components/account/SelectAccount'
import { Button } from '../../components/buttons'
import { Label } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { Text, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { WaitModal } from '../WaitModal'
import { UpdateMemberForm } from './UpdateMembershipFormModal'

interface SignProps {
  onClose: () => void
  transactionParams: UpdateMemberForm
  onDone: (result: boolean, fee: BN) => void
  member: BaseMember
}

export const SignUpdateMembershipModal = ({ onClose, transactionParams, member, onDone }: SignProps) => {
  const { api } = useApi()
  const updateProfileTransaction = useMemo(
    () =>
      api?.tx?.members?.updateProfile(
        member.id,
        transactionParams.name as string,
        transactionParams.handle as string,
        transactionParams.avatarURI as string,
        transactionParams.about as string
      ),
    [member.id]
  )

  const signer: Account = {
    address: member.controllerAccount as Address,
    name: '',
  }
  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction: updateProfileTransaction,
    from: signer,
    onDone,
  })

  if (status === 'READY') {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize transaction" />
        <ModalBody>
          <Text>You intend to update your membership.</Text>
          <Text>
            Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
          </Text>
          <Row>
            <Label>Sending from account</Label>
            <SelectedAccount account={signer} />
          </Row>
        </ModalBody>
        <ModalFooter>
          <BalanceInfoNarrow>
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={paymentInfo?.partialFee.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
          </BalanceInfoNarrow>
          <Button size="medium" onClick={send} disabled={status !== 'READY'}>
            Sign and update a member
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
