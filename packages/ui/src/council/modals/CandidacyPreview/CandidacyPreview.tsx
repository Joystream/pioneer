import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { ButtonGhost, ButtonPrimary, ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { SidePaneTopButtonsGroup } from '@/common/components/SidePane'
import { useModal } from '@/common/hooks/useModal'
import { isDefined } from '@/common/utils'
import { getUrl } from '@/common/utils/getUrl'
import { CouncilRoutes } from '@/council/constants'
import { useCandidate } from '@/council/hooks/useCandidate'
import { useElectionCandidatesIds } from '@/council/hooks/useElectionCandidatesIds'
import { MemberDetails } from '@/memberships/components/MemberProfile'
import { MemberAccounts } from '@/memberships/components/MemberProfile/MemberAccounts'
import { MemberModal } from '@/memberships/components/MemberProfile/MemberModal'
import { MemberSideRoles } from '@/memberships/components/MemberProfile/MemberRoles'

import { CandidacyDetails } from './CandidacyDetails'
import { CandidacyPreviewModalCall } from './types'

export type CandidacyPreviewTabs = 'CANDIDACY' | 'DETAILS' | 'ACCOUNTS' | 'ROLES'

const isPreviousDisabled = (candidateIndex: number | undefined, candidates: string[] | undefined) =>
  !isDefined(candidateIndex) || !candidates || candidateIndex <= 0

const isNextDisabled = (candidateIndex: number | undefined, candidates: string[] | undefined) =>
  !isDefined(candidateIndex) || !candidates || candidateIndex === candidates.length - 1 || candidateIndex === -1

export const CandidacyPreview = React.memo(() => {
  const [activeTab, setActiveTab] = useState<CandidacyPreviewTabs>('CANDIDACY')
  const { modalData } = useModal<CandidacyPreviewModalCall>()
  const [candidateId, setCandidateId] = useState(modalData.id)
  const { isLoading, candidate } = useCandidate(candidateId)
  const candidates = useElectionCandidatesIds(candidate?.cycleId)
  const candidateIndex = candidate && candidates?.findIndex((id) => id === candidate?.id)
  const history = useHistory()
  useEffect(() => {
    if (candidate?.cycleFinished && history.location.pathname !== CouncilRoutes.pastElections) {
      history.replace(`${CouncilRoutes.pastElections}?candidate=${candidate.id}`)
    }
  }, [candidate?.cycleFinished])
  const onClickLeft = () => candidates && isDefined(candidateIndex) && setCandidateId(candidates[candidateIndex - 1])
  const onClickRight = () => candidates && isDefined(candidateIndex) && setCandidateId(candidates[candidateIndex + 1])

  return (
    <MemberModal
      title={`Candidate ${(candidateIndex ?? -1) + 1} of ${candidates?.length}`}
      tabs={[
        { title: 'Candidacy', active: activeTab === 'CANDIDACY', onClick: () => setActiveTab('CANDIDACY') },
        { title: 'Member details', active: activeTab === 'DETAILS', onClick: () => setActiveTab('DETAILS') },
        { title: 'Accounts', active: activeTab === 'ACCOUNTS', onClick: () => setActiveTab('ACCOUNTS') },
        { title: 'Roles', active: activeTab === 'ROLES', onClick: () => setActiveTab('ROLES') },
      ]}
      member={candidate?.member}
      isLoading={isLoading}
      contextButtons={
        <SidePaneTopButtonsGroup>
          <ButtonGhost
            title="Previous candidate"
            size="small"
            disabled={isPreviousDisabled(candidateIndex, candidates)}
            onClick={onClickLeft}
          >
            <Arrow direction="left" />
          </ButtonGhost>
          <ButtonGhost
            title="Next candidate"
            size="small"
            disabled={isNextDisabled(candidateIndex, candidates)}
            onClick={onClickRight}
          >
            <Arrow direction="right" />
          </ButtonGhost>
          <CopyButtonTemplate
            square
            size="small"
            textToCopy={getUrl({
              page: candidate?.cycleFinished ? 'PastElections' : 'Election',
              query: { candidate: candidate?.id ?? '' },
            })}
            icon={<LinkIcon />}
          />
        </SidePaneTopButtonsGroup>
      }
      footer={
        <ButtonsGroup>
          <ButtonPrimary size="small">Vote</ButtonPrimary>
        </ButtonsGroup>
      }
    >
      {!candidate ? (
        <Loading />
      ) : (
        <>
          {activeTab === 'CANDIDACY' && <CandidacyDetails candidate={candidate} />}
          {activeTab === 'DETAILS' && <MemberDetails member={candidate.member} />}
          {activeTab === 'ACCOUNTS' && <MemberAccounts member={candidate.member} />}
          {activeTab === 'ROLES' && <MemberSideRoles member={candidate.member} />}
        </>
      )}
    </MemberModal>
  )
})
