import { useActor } from '@xstate/react'
import React from 'react'
import { ActorRef, State } from 'xstate'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { TransactionEvent } from '@/common/model/machines'
import { TransactionContext } from '@/proposals/modals/AddNewProposal/machine'

interface Props {
  onClose: () => void
  service: ActorRef<TransactionEvent, State<TransactionContext>>
}

export const WithdrawSignModal = ({ onClose, service }: Props) => {
  const [state, send] = useActor(service)

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to withdraw your candidacy</TextMedium>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" disabled={!state.matches('prepare')} onClick={() => send('SIGN')}>
          Sign and send
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
