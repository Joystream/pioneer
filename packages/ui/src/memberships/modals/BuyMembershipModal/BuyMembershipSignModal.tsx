import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useEffect, useState } from 'react'
import { ActorRef } from 'xstate'

import { SelectAccount, SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter, Row } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'

import { getMessage } from '../utils'

import { MemberFormFields } from './BuyMembershipFormModal'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  formData: MemberFormFields
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  initialSigner?: Account
  service: ActorRef<any>
}

export const BuyMembershipSignModal = ({
  onClose,
  membershipPrice,
  formData,
  transaction,
  initialSigner,
  service,
}: SignProps) => {
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
  const [hasFunds, setHasFunds] = useState(true)
  const balance = useBalance(fromAddress)
  const validationInfo = balance?.transferable && paymentInfo?.partialFee && membershipPrice

  useEffect(() => {
    if (validationInfo) {
      const requiredBalance = paymentInfo.partialFee.add(membershipPrice)
      const hasFunds = balance.transferable.gte(requiredBalance)
      setHasFunds(hasFunds)
    }
  }, [fromAddress, balance])

  const signDisabled = !isReady || !hasFunds || !validationInfo

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to create a new membership.</TextMedium>
        <TextMedium>
          The creation of the new membership costs <TokenValue value={membershipPrice?.toBn()} />.
        </TextMedium>
        <TextMedium>
          Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <InputComponent
            label="Sending from account"
            inputSize="l"
            validation={hasFunds && balance ? undefined : 'invalid'}
            message={hasFunds && balance ? undefined : getMessage(paymentInfo?.partialFee)}
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
        next={{ disabled: signDisabled, label: 'Sign and create a member', onClick: sign }}
      >
        <TransactionInfo
          title="Creation fee:"
          value={membershipPrice?.toBn()}
          tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
        />
      </ModalTransactionFooter>
    </TransactionModal>
  )
}
