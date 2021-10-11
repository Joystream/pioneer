import React, { useMemo } from 'react'
import { ActorRef, State } from 'xstate'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { TransactionEvent } from '@/common/model/machines'
import { Member } from '@/memberships/types'
import { TransactionContext } from '@/proposals/modals/AddNewProposal/machine'

interface Props {
  onClose: () => void
  service: ActorRef<TransactionEvent, State<TransactionContext>>
  member: Member
}

export const WithdrawSignModal = ({ onClose, service, member }: Props) => {
  const { api } = useApi()
  const transaction = useMemo(() => api?.tx.council.withdrawCandidacy(member.id), [member.id])
  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: member.controllerAccount,
  })

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to withdraw your candidacy</TextMedium>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee.toBn()}
            tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!isReady} onClick={sign}>
          Sign and send
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
