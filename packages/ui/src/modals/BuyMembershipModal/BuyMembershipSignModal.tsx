import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useEffect, useState } from 'react'

import { Account, Member, onTransactionDone } from '../../common/types'
import { SelectAccount, SelectedAccount } from '../../components/account/SelectAccount'
import { ButtonPrimary } from '../../components/buttons'
import { InputComponent } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { TextMedium, TokenValue } from '../../components/typography'
import { useBalance } from '../../hooks/useBalance'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { WaitModal } from '../WaitModal'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  transactionParams: Member
  onDone: onTransactionDone
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  initialSigner?: Account
  isInvite?: boolean
}

export const BuyMembershipSignModal = ({
  onClose,
  membershipPrice,
  transactionParams,
  onDone,
  transaction,
  isInvite,
  initialSigner,
}: SignProps) => {
  const [from, setFrom] = useState(
    initialSigner ??
      ({
        name: 'Controller account',
        address: transactionParams.invitor?.controllerAccount,
      } as Account)
  )
  const { paymentInfo, send, status } = useSignAndSendTransaction({ transaction, from: from, onDone })
  const [hasFunds, setHasFunds] = useState(false)
  const balance = useBalance(from)

  useEffect(() => {
    if (balance?.transferable && paymentInfo?.partialFee && membershipPrice) {
      const requiredBalance = paymentInfo.partialFee.add(membershipPrice)
      const hasFunds = balance.transferable.gte(requiredBalance)
      setHasFunds(hasFunds)
    }
  }, [from.address, balance])

  const signDisabled = status !== 'READY' || !hasFunds

  if (status === 'READY') {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize transaction" />
        <ModalBody>
          <TextMedium>You intend to create a new membership.</TextMedium>
          {isInvite ? (
            <TextMedium>
              You are inviting this member. You have {transactionParams.invitor?.inviteCount.toString()} invites left.
            </TextMedium>
          ) : (
            <TextMedium>
              The creation of the new membership costs <TokenValue value={membershipPrice?.toBn()} />.
            </TextMedium>
          )}
          <TextMedium>
            Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
          </TextMedium>
          <Row>
            <InputComponent label="Sending from account" inputSize="l">
              {initialSigner ? (
                <SelectAccount selected={from} onChange={(account) => setFrom(account)} />
              ) : (
                <SelectedAccount account={from} />
              )}
            </InputComponent>
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
                <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} absolute />
              </>
            )}
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={paymentInfo?.partialFee.toBn()} />
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
