import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ModalBody, ModalTransactionFooter, Row } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal, TransactionStep } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'

interface SignProps {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  stake: BN
  service: ActorRef<any>
  steps: TransactionStep[]
}

export const ApplyForRoleSignModal = ({ onClose, transaction, signer, stake, service, steps }: SignProps) => {
  const { allAccounts } = useMyAccounts()
  const signerAccount = accountOrNamed(allAccounts, signer, 'ControllerAccount')
  const { paymentInfo, sign, isReady, noFeeFunds } = useSignAndSendTransaction({ transaction, signer, service })
  const partialFee = paymentInfo?.partialFee
  const signDisabled = !isReady || noFeeFunds

  return (
    <TransactionModal onClose={onClose} service={service} useMultiTransaction={{ steps: steps, active: 1 }}>
      <ModalBody>
        <TextMedium>You intend to apply for a role.</TextMedium>
        <TextMedium>
          You intend to stake <TokenValue value={stake} />.
        </TextMedium>
        <TextMedium>
          Fees of <TokenValue value={partialFee?.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <SelectedAccount account={signerAccount} />
        </Row>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={partialFee?.toBn()}
        next={{ disabled: signDisabled, label: 'Sign transaction and Stake', onClick: sign }}
      >
        <TransactionInfo
          title="Stake:"
          value={stake}
          tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
        />
      </ModalTransactionFooter>
    </TransactionModal>
  )
}
