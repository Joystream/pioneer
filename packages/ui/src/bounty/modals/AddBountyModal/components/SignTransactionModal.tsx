import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { ActorRef } from 'xstate'

import { useBalance } from '@/accounts/hooks/useBalance'
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
  signer: Member
  service: ActorRef<any>
  cherry: BN
}

export const SignTransactionModal = ({ onClose, service, signer, transaction, cherry }: SignTransactionModalProps) => {
  const [hasFunds, setHasFunds] = useState<boolean>(false)
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: signer?.controllerAccount || '',
    service,
  })
  const balance = useBalance(signer?.controllerAccount)

  useEffect(() => {
    if (balance && paymentInfo) {
      setHasFunds(balance.transferable.gte(cherry.add(paymentInfo.partialFee)))
    }
  }, [balance, paymentInfo])

  const signDisabled = !isReady || !hasFunds

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to create a bounty.</TextMedium>
        <TextMedium>
          You will be charged <TokenValue value={cherry} /> for cherry.
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
          Sign transaction and Create
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
