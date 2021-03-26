import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import React, { useState } from 'react'
import { Account, Member, onTransactionDone } from '../../common/types'
import { Button } from '../../components/buttons'
import { Label } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { SelectAccount } from '../../components/account/SelectAccount'
import { Text, TokenValue } from '../../components/typography'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { WaitModal } from '../WaitModal'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  transactionParams: Member
  onDone: onTransactionDone
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  initialSigner: Account
  isInvite?: boolean
}

export const SignCreateMemberModal = ({
  onClose,
  membershipPrice,
  transactionParams,
  onDone,
  transaction,
  initialSigner,
  isInvite,
}: SignProps) => {
  const [from, setFrom] = useState(initialSigner)

  const { paymentInfo, send, status } = useSignAndSendTransaction({ transaction, from, onDone })

  if (status === 'READY') {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize transaction" />
        <ModalBody>
          <Text>You intend to create a new membership.</Text>
          {isInvite ? (
            <Text>
              You are inviting this member. You have {transactionParams.invitor?.inviteCount.toString()} invites left.
            </Text>
          ) : (
            <Text>
              The creation of the new membership costs <TokenValue value={membershipPrice?.toBn()} />.
            </Text>
          )}
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
            {!isInvite && (
              <>
                <InfoTitle>Creation fee:</InfoTitle>
                <InfoValue>
                  <TokenValue value={membershipPrice?.toBn()} />
                </InfoValue>
                <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
              </>
            )}
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={paymentInfo?.partialFee.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
          </BalanceInfoNarrow>
          <Button size="medium" onClick={send} disabled={status !== 'READY'}>
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
