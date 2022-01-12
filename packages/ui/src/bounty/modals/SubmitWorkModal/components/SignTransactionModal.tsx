import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useState } from 'react'
import { ActorRef } from 'xstate'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface SignTransactionModalProps {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer?: Member
  service: ActorRef<any>
}

export const SignTransactionModal = ({ onClose, service, signer, transaction }: SignTransactionModalProps) => {
  const [hasFunds, setHasFunds] = useState<boolean>(false)
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: signer?.controllerAccount || '',
    service,
  })
  const balances = useMyBalances()

  const signDisabled = !isReady || !hasFunds

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to create a bounty.</TextMedium>
        <TextMedium>
          Fees of <TokenValue value={paymentInfo?.partialFee} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <SelectedMember member={signer} />
        </Row>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Transaction fee:" value={paymentInfo?.partialFee} />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={signDisabled}>
          Submit work
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
