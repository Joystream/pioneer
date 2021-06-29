import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { ISubmittableResult } from '@polkadot/types/types'
import { useActor } from '@xstate/react'
import React, { useEffect, useState } from 'react'
import { ActorRef } from 'xstate'

import { SelectAccount, SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TransactionModal } from '@/common/components/TransactionModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'

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
  const { paymentInfo } = useSignAndSendTransaction({ transaction, signer: fromAddress, service })
  const [hasFunds, setHasFunds] = useState(false)
  const balance = useBalance(fromAddress)
  const [state, send] = useActor(service)

  useEffect(() => {
    if (balance?.transferable && paymentInfo?.partialFee && membershipPrice) {
      const requiredBalance = paymentInfo.partialFee.add(membershipPrice)
      const hasFunds = balance.transferable.gte(requiredBalance)
      setHasFunds(hasFunds)
    }
  }, [fromAddress, balance])

  const signDisabled = !state.matches('prepare') || !hasFunds

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
            validation={hasFunds ? undefined : 'invalid'}
            message={hasFunds ? undefined : getMessage(paymentInfo?.partialFee)}
          >
            {initialSigner ? (
              <SelectAccount selected={from} onChange={(account) => setFrom(account)} />
            ) : (
              <SelectedAccount account={from} />
            )}
          </InputComponent>
        </Row>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Creation fee:"
            value={membershipPrice?.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={() => send('SIGN')} disabled={signDisabled}>
          Sign and create a member
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
