import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { ReactNode, useEffect, useState } from 'react'

import { SelectAccount, SelectedAccount } from '../../../accounts/components/SelectAccount'
import { useAccounts } from '../../../accounts/hooks/useAccounts'
import { useBalance } from '../../../accounts/hooks/useBalance'
import { accountOrNamed } from '../../../accounts/model/accountOrNamed'
import { Account } from '../../../accounts/types'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent } from '../../../common/components/forms'
import { Help } from '../../../common/components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../../../common/components/Modals'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { WaitModal } from '../../../common/components/WaitModal'
import { TransactionStatus, useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { onTransactionDone } from '../../../common/types'
import { Member } from '../../types'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  transactionParams: Member
  onDone: onTransactionDone
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  initialSigner?: Account
}

interface TransactionModalProps {
  children: ReactNode
  status: TransactionStatus
  onClose: () => void
}

const TransactionModal = ({ status, onClose, children }: TransactionModalProps) => {
  if (status === 'READY') {
    return <>{children}</>
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

export const BuyMembershipSignModal = ({
  onClose,
  membershipPrice,
  transactionParams,
  onDone,
  transaction,
  initialSigner,
}: SignProps) => {
  const { allAccounts } = useAccounts()
  const [from, setFrom] = useState(
    initialSigner ??
      accountOrNamed(allAccounts, transactionParams.invitor?.controllerAccount || '', 'Controller account')
  )
  const fromAddress = from.address
  const { paymentInfo, send, status } = useSignAndSendTransaction({ transaction, signer: fromAddress, onDone })
  const [hasFunds, setHasFunds] = useState(false)
  const balance = useBalance(fromAddress)

  useEffect(() => {
    if (balance?.transferable && paymentInfo?.partialFee && membershipPrice) {
      const requiredBalance = paymentInfo.partialFee.add(membershipPrice)
      const hasFunds = balance.transferable.gte(requiredBalance)
      setHasFunds(hasFunds)
    }
  }, [fromAddress, balance])

  const signDisabled = status !== 'READY' || !hasFunds

  return (
    <TransactionModal status={status} onClose={onClose}>
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize transaction" />
        <ModalBody>
          <TextMedium>You intend to create a new membership.</TextMedium>
          <TextMedium>
            The creation of the new membership costs <TokenValue value={membershipPrice?.toBn()} />.
          </TextMedium>
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
            <InfoTitle>Creation fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={membershipPrice?.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} absolute />
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
    </TransactionModal>
  )
}
