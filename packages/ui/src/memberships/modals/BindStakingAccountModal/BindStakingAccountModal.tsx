import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ModalBody, ModalTransactionFooter, Row } from '@/common/components/Modal'
import { Label, TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal, TransactionStep } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'
import { MemberRow } from '@/memberships/modals/components'

interface SignProps {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  service: ActorRef<any>
  memberId: string
  steps: TransactionStep[]
}

export const BindStakingAccountModal = ({ onClose, transaction, signer, service, memberId, steps }: SignProps) => {
  const { allAccounts } = useMyAccounts()
  const { member } = useMember(memberId)
  const signerAccount = accountOrNamed(allAccounts, signer, 'Account to Bind')
  const { paymentInfo, sign, isReady, canAfford } = useSignAndSendTransaction({
    transaction,
    signer,
    service,
    skipQueryNode: true,
  })
  const partialFee = paymentInfo?.partialFee
  const signDisabled = !isReady || !canAfford

  return (
    <TransactionModal onClose={onClose} service={service} useMultiTransaction={{ steps, active: 0 }}>
      <ModalBody>
        <TextMedium>You intend to bind account for staking</TextMedium>
        <TextMedium>
          Fees of <TokenValue value={partialFee?.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <Label>Staking account</Label>
          <SelectedAccount account={signerAccount} />
        </Row>
        <Label>Member</Label>
        <MemberRow>{member && <MemberInfo member={member} skipModal />}</MemberRow>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={partialFee?.toBn()}
        next={{ disabled: signDisabled, label: 'Sign transaction and Bind Staking Account', onClick: sign }}
      />
    </TransactionModal>
  )
}
