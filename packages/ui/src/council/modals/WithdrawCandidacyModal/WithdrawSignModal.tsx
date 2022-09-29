import React, { useMemo } from 'react'
import { ActorRef, State } from 'xstate'

import { useApi } from '@/api/hooks/useApi'
import { ModalBody, ModalTransactionFooter } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
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
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee.toBn()}
        next={{ disabled: !isReady, label: 'Sign and send', onClick: sign }}
      />
    </TransactionModal>
  )
}
