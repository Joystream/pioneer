import BN from 'bn.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Event, EventData } from 'xstate/lib/types'

import { StakeStep } from '@/accounts/components/StakeStep'
import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, ScrollableModalColumn, ScrolledModalBody } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'
import { useCandidate } from '@/council/hooks/useCandidate'
import { StakeStepFormFields } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'

import { CandidacyReview } from './components/CandidacyReview'
import { StakeEvent, VoteForCouncilModalCall } from './types'

export interface VoteForCouncilFormModalProps {
  minStake: BN
  send: (event: Event<StakeEvent>, payload?: EventData | undefined) => void
}

export const VoteForCouncilFormModal = ({ minStake, send }: VoteForCouncilFormModalProps) => {
  const { hideModal, modalData } = useModal<VoteForCouncilModalCall>()
  const { candidate } = useCandidate(modalData.id)
  const [isValid, setValid] = useState(false)
  const [stake, setStake] = useState<StakeStepFormFields | null>(null)

  const onStakeStepChange = useCallback(
    (isValid: boolean, fields: StakeStepFormFields) => {
      setValid(isValid)
      setStake(fields)
    },
    [setValid, setStake]
  )

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Vote for council" />
      <VoteForCouncilModalBody>
        <CandidacyReview candidate={candidate} minStake={minStake} />
        <ScrollableModalColumn>
          <StakeStep stakeLock="Voting" minStake={minStake} onChange={onStakeStepChange} />
        </ScrollableModalColumn>
      </VoteForCouncilModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={() => send('SET_STAKE', { stake })} size="medium">
          Next step
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const VoteForCouncilModalBody = styled(ScrolledModalBody)`
  flex-direction: row;
`
