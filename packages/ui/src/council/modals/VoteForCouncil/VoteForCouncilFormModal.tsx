import BN from 'bn.js'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Event, EventData } from 'xstate/lib/types'

import { ButtonPrimary } from '@/common/components/buttons'
import { StakeStep } from '@/common/components/forms/StakeStep'
import { Arrow } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { Modal, ModalFooter, ModalHeader, ScrollableModalColumn, ScrolledModalBody } from '@/common/components/Modal'
import { TokenValueStat } from '@/common/components/statistics'
import { TextMedium } from '@/common/components/typography'
import { BulletPoint, Colors, Overflow } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { CandidateStatistics } from '@/council/components/candidate/CandidateStatistics'
import { useCandidate } from '@/council/hooks/useCandidate'
import { MemberInfo } from '@/memberships/components'
import { StakeStepFormFields } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'

import { VoteForCouncilModalCall } from '.'
import { StakeEvent } from './machine'

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

  const candidacy = useMemo(() => {
    if (!candidate) {
      return <Loading />
    }

    return (
      <>
        <h6>Candidate</h6>
        <MemberInfo member={candidate.member} memberSize="l" size="l" skipModal />

        <h4>{candidate.title}</h4>

        <CandidacyPointList>
          <CandidacyPoint>The More Important the Work, the More Important the Rest</CandidacyPoint>
          <CandidacyPoint>How to build a loyal community online and offline</CandidacyPoint>
          <CandidacyPoint>Helping a local business reinvent itself</CandidacyPoint>
        </CandidacyPointList>

        <div>
          <StatsHeading bold>Past elections outcomes</StatsHeading>
          <CandidateStatistics memberId={candidate.member.id} />
        </div>

        <MinStakeStat value={minStake} title="Min Stake Required" tooltipTitle="Lorem ipsum" size="s" />
      </>
    )
  }, [candidate])

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Vote for council" />
      <VoteForCouncilModalBody>
        <CandidatePreviewColumn>{candidacy}</CandidatePreviewColumn>
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

const CandidatePreviewColumn = styled(ScrollableModalColumn)`
  background-color: ${Colors.Black[100]};
  display: flex;
  flex: 0 0 336px;
  flex-direction: column;
  gap: 24px;
`

const CandidacyPointList = styled.ul`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  list-style-type: disc;
  list-style-position: inside;
`
const CandidacyPoint = styled.li`
  color: ${Colors.Black[500]};
  font-size: 16px;
  line-height: 20px;
  ${Overflow.DotsTwoLine};
  ${BulletPoint};

  & + & {
    margin-top: 8px;
  }
`

const StatsHeading = styled(TextMedium)`
  margin-bottom: 4px;
`

const MinStakeStat = styled(TokenValueStat)`
  background-color: transparent;
  flex: 0 0 auto;
  margin-top: 64px;
  padding: 0;
`
