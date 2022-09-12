import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter, Row } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'

import { MemberFormFields } from '../BuyMembershipModal/BuyMembershipFormModal'

interface SignProps {
  onClose: () => void
  formData: MemberFormFields
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  service: ActorRef<any>
}

export const InviteMemberSignModal = ({ onClose, formData, transaction, signer, service }: SignProps) => {
  const { allAccounts } = useMyAccounts()
  const signerAccount = accountOrNamed(allAccounts, signer, 'ControllerAccount')
  const { paymentInfo, sign, isReady, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: signer,
    service,
  })
  const partialFee = paymentInfo?.partialFee
  const signDisabled = !isReady || !canAfford

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to create a new membership.</TextMedium>
        <TextMedium>
          You are inviting this member. You have {formData.invitor?.inviteCount.toString()} invites left.
        </TextMedium>
        <TextMedium>
          Fees of <TokenValue value={partialFee?.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <InputComponent
            label="Sending from account"
            inputSize="l"
            validation={!canAfford ? 'invalid' : undefined}
            message={!canAfford ? 'Insufficient funds to cover the membership creation.' : undefined}
          >
            <SelectedAccount account={signerAccount} />
          </InputComponent>
        </Row>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={partialFee?.toBn()}
        next={{ disabled: signDisabled, label: 'Sign and create a member', onClick: sign }}
      />
    </TransactionModal>
  )
}
