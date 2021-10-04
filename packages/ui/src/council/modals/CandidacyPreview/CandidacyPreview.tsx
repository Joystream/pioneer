import React, { useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, CopyButtonTemplate } from '@/common/components/buttons'
import { ArrowRightIcon } from '@/common/components/icons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { SidePaneTopButtonsGroup } from '@/common/components/SidePane'
import { useModal } from '@/common/hooks/useModal'
import { isDefined } from '@/common/utils'
import { useCandidate } from '@/council/hooks/useCandidate'
import { useElectionCandidatesIds } from '@/council/hooks/useElectionCandidatesIds'
import { MemberDetails } from '@/memberships/components/MemberProfile'
import { MemberAccounts } from '@/memberships/components/MemberProfile/MemberAccounts'
import { MemberModal } from '@/memberships/components/MemberProfile/MemberModal'
import { MemberSideRoles } from '@/memberships/components/MemberProfile/MemberRoles'

import { CandidacyDetails } from './CandidacyDetails'
import { CandidacyPreviewModalCall } from './types'

type ProfileTabs = 'CANDIDACY' | 'DETAILS' | 'ACCOUNTS' | 'ROLES'

export const CandidacyPreview = React.memo(() => {
  const [activeTab, setActiveTab] = useState<ProfileTabs>('CANDIDACY')
  const { modalData } = useModal<CandidacyPreviewModalCall>()
  const [candidateId, setCandidateId] = useState(modalData.id)
  const { isLoading, candidate } = useCandidate(candidateId)
  const candidates = useElectionCandidatesIds(modalData.cycleId)
  const candidateIndex = candidate && candidates?.findIndex((id) => id === candidate?.id)
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
            size="small"
            disabled={!isDefined(candidateIndex) || !candidates || candidateIndex <= 0}
            onClick={onClickLeft}
          >
            <ArrowLeftIcon />
          </ButtonGhost>
          <ButtonGhost
            size="small"
            disabled={!isDefined(candidateIndex) || !candidates || candidateIndex === candidates.length - 1}
            onClick={onClickRight}
          >
            <ArrowRightIcon />
          </ButtonGhost>
          <CopyButtonTemplate
            square
            size="small"
            textToCopy={`${window.location.host}/#/members/${candidate?.member.id}`}
            icon={<LinkIcon />}
          />
        </SidePaneTopButtonsGroup>
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

const RotatedIcon = styled.div`
  display: flex;
  align-items: center;
  transform: rotate(0.5turn);
`

const ArrowLeftIcon = () => (
  <RotatedIcon>
    <ArrowRightIcon />
  </RotatedIcon>
)
