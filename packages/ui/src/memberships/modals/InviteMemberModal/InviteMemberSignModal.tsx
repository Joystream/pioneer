import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useEffect, useState } from 'react'

import { SelectedAccount } from '../../../accounts/components/SelectAccount'
import { useAccounts } from '../../../accounts/hooks/useAccounts'
import { useBalance } from '../../../accounts/hooks/useBalance'
import { accountOrNamed } from '../../../accounts/model/accountOrNamed'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent } from '../../../common/components/forms'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '../../../common/components/Modal'
import { TransactionInfo } from '../../../common/components/TransactionInfo'
import { TransactionModal } from '../../../common/components/TransactionModal'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { Address, onTransactionDone } from '../../../common/types'
import { FormFields } from '../BuyMembershipModal/BuyMembershipFormModal'
import { getMessage } from '../utils'

interface SignProps {
  onClose: () => void
  formData: FormFields
  onDone: onTransactionDone
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
}

export const InviteMemberSignModal = ({ onClose, formData, onDone, transaction, signer }: SignProps) => {
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

  return (
    <TransactionModal status={status} onClose={onClose}>
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
            validation={hasFunds ? undefined : 'invalid'}
            message={hasFunds ? undefined : getMessage(partialFee)}
          >
            <SelectedAccount account={signerAccount} />
          </InputComponent>
        </Row>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={partialFee?.toBn()}
            helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={send} disabled={signDisabled}>
          Sign and create a member
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
