import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useMemo, useState } from 'react'
import { ActorRef } from 'xstate'

import { SelectAccount, SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter, Row } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { getFeeSpendableBalance } from '@/common/providers/transactionFees/provider'

import { MemberFormFields } from './BuyMembershipFormModal'

interface SignProps {
  onClose: () => void
  formData: MemberFormFields
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  initialSigner?: Account
  service: ActorRef<any>
}

export const AddStakingAccCandidateModal = ({ onClose, formData, transaction, initialSigner, service }: SignProps) => {
  const { allAccounts } = useMyAccounts()
  const [from, setFrom] = useState(
    initialSigner ?? accountOrNamed(allAccounts, formData.invitor?.controllerAccount || '', 'Controller account')
  )
  const fromAddress = from.address
  const { isReady, paymentInfo, sign } = useSignAndSendTransaction({
    transaction,
    signer: fromAddress,
    service,
  })
  const balance = useBalance(fromAddress)
  const validationInfo = balance?.transferable && paymentInfo?.partialFee

  const hasFunds = useMemo(() => {
    if (validationInfo) {
      return getFeeSpendableBalance(balance).gte(paymentInfo?.partialFee)
    }
  }, [fromAddress, !balance, !validationInfo])

  const signDisabled = !isReady || !hasFunds || !validationInfo

  return (
    <TransactionModal
      onClose={onClose}
      service={service}
      useMultiTransaction={{
        steps: [{ title: 'Create Membership' }, { title: 'Bind Validator account' }, { title: 'Confirm Validator Account' }],
        active: 1,
      }}
    >
      <ModalBody>
        <TextMedium>You are intending to bond your validator account with your membership</TextMedium>
        <TextMedium>
          Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <InputComponent
            label="Sending from account"
            inputSize="l"
            validation={hasFunds !== false && balance ? undefined : 'invalid'}
            message={hasFunds !== false && balance ? undefined : 'Insufficient funds to cover the membership creation.'}
          >
            {initialSigner ? (
              <SelectAccount selected={from} onChange={(account) => setFrom(account)} />
            ) : (
              <SelectedAccount account={from} />
            )}
          </InputComponent>
        </Row>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee.toBn()}
        next={{
          disabled: signDisabled,
          label: 'Sign and Bond',
          onClick: sign,
        }}
      ></ModalTransactionFooter>
    </TransactionModal>
  )
}
