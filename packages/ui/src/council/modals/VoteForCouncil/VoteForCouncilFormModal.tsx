import BN from 'bn.js'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Event, EventData } from 'xstate/lib/types'
import * as Yup from 'yup'

import { StakeStep } from '@/accounts/components/StakeStep'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, ScrollableModalColumn, ScrolledModalBody } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { BNSchema, minContext } from '@/common/utils/validation'
import { useCandidate } from '@/council/hooks/useCandidate'
import { useMyCastVotes } from '@/council/hooks/useMyCastVotes'
import { VoteForCouncilEvent, VoteForCouncilMachineState } from '@/council/modals/VoteForCouncil/machine'
import { AccountSchema } from '@/memberships/model/validation'

import { CandidacyReview } from './components/CandidacyReview'
import { VoteForCouncilModalCall } from './types'

export interface VoteForCouncilFormModalProps {
  minStake: BN
  send: (event: Event<VoteForCouncilEvent>, payload?: EventData | undefined) => void
  state?: VoteForCouncilMachineState
}

const StakeStepFormSchema = Yup.object().shape({
  account: AccountSchema.required(),
  stake: BNSchema.test(minContext('You need at least ${min} stake', 'minStake')).required(),
})

export const VoteForCouncilFormModal = ({ minStake, send, state }: VoteForCouncilFormModalProps) => {
  const { hideModal, modalData } = useModal<VoteForCouncilModalCall>()
  const { candidate } = useCandidate(modalData.id)
  const { isValid, setContext, errors } = useSchema({ ...state?.context }, StakeStepFormSchema)
  const { votes } = useMyCastVotes(candidate?.cycleId)
  const alreadyVotedAccounts = votes?.map(({ castBy }) => castBy)
  const accountsFilter = useCallback(
    ({ address }: Account) => !!alreadyVotedAccounts && !alreadyVotedAccounts.includes(address),
    [alreadyVotedAccounts?.length]
  )

  useEffect(() => {
    setContext({ minStake })
  }, [])

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Vote for council" />
      <VoteForCouncilModalBody>
        <CandidacyReview candidate={candidate} minStake={minStake} />
        <ScrollableModalColumn>
          <StakeStep
            stakeLock="Voting"
            minStake={minStake}
            accountsFilter={accountsFilter}
            send={send}
            state={state}
            errors={errors}
          />
        </ScrollableModalColumn>
      </VoteForCouncilModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={() => send('PASS')} size="medium">
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
