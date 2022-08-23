import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ModalBody, ModalTransactionFooter, Row } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal, TransactionStep } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'

interface SignTransactionModalProps {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  service: ActorRef<any>
  steps?: TransactionStep[]
}

export const SignTransactionModal = ({ onClose, transaction, signer, service, steps }: SignTransactionModalProps) => {
  const { allAccounts } = useMyAccounts()
  const signerAccount = accountOrNamed(allAccounts, signer, 'ControllerAccount')
  const { paymentInfo, sign, isReady, canAfford } = useSignAndSendTransaction({ transaction, signer, service })
  const partialFee = paymentInfo?.partialFee
  const signDisabled = !isReady || !canAfford

  return (
    <TransactionModal onClose={onClose} service={service} useMultiTransaction={steps && { steps, active: 2 }}>
      <ModalBody>
        <TextMedium>You intend to change the proposal discussion thread mode.</TextMedium>
        <TextMedium>
          Fees of <TokenValue value={partialFee?.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <SelectedAccount account={signerAccount} />
        </Row>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={partialFee?.toBn()}
        next={{ disabled: signDisabled, label: 'Sign transaction and change mode', onClick: sign }}
      />
    </TransactionModal>
  )
}
