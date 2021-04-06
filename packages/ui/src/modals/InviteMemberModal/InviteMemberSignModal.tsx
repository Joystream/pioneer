import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { Address, Member, onTransactionDone } from '../../common/types'
import { SelectedAccount } from '../../components/account/SelectAccount'
import { ButtonPrimary } from '../../components/buttons'
import { InputComponent } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { TextMedium, TokenValue } from '../../components/typography'
import { useAccounts } from '../../hooks/useAccounts'
import { useBalance } from '../../hooks/useBalance'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import { accountOrNamed } from '../../utils/accountOrNamed'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { WaitModal } from '../WaitModal'

interface SignProps {
  onClose: () => void
  transactionParams: Member
  onDone: onTransactionDone
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
}

const getMessage = (fee?: BN) => {
  return `Insufficient funds to cover the membership creation. You need at least ${fee?.toString()} JOY on your controller account for this action.
Please choose different member.`
}

export const InviteMemberSignModal = ({ onClose, transactionParams, onDone, transaction, signer }: SignProps) => {
  const { allAccounts } = useAccounts()
  const signerAccount = accountOrNamed(allAccounts, signer, 'ControllerAccount')
  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction,
    signer: signer,
    onDone,
  })
  const [hasFunds, setHasFunds] = useState(false)
  const balance = useBalance(signer)
  const transferable = balance?.transferable
  const partialFee = paymentInfo?.partialFee

  useEffect(() => {
    if (transferable && partialFee) {
      setHasFunds(transferable.gte(partialFee))
    }
  }, [partialFee?.toString(), transferable?.toString()])

  const signDisabled = status !== 'READY' || !hasFunds

  if (status === 'READY') {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize transaction" />
        <ModalBody>
          <TextMedium>You intend to create a new membership.</TextMedium>
          <TextMedium>
            You are inviting this member. You have {transactionParams.invitor?.inviteCount.toString()} invites left.
          </TextMedium>
          <TextMedium>
            Fees of <TokenValue value={partialFee?.toBn()} /> will be applied to the transaction.
          </TextMedium>
          <Row>
            <InputComponent
              label="Sending from account"
              inputSize="l"
              validation={hasFunds ? undefined : 'invalid'}
              message={hasFunds ? undefined : getMessage(partialFee)}
            >
              <SelectedAccount account={signerAccount} />
            </InputComponent>
          </Row>
        </ModalBody>
        <ModalFooter>
          <BalanceInfoNarrow>
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={partialFee?.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} absolute />
          </BalanceInfoNarrow>
          <ButtonPrimary size="medium" onClick={send} disabled={signDisabled}>
            Sign and create a member
          </ButtonPrimary>
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
