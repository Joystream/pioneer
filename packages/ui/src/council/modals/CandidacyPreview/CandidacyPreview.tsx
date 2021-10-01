import React, { useState } from 'react'

import { CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { SidePaneTopButtonsGroup } from '@/common/components/SidePane'
import { useModal } from '@/common/hooks/useModal'
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
  const { isLoading, candidate } = useCandidate(modalData.id)
  const candidates = useElectionCandidatesIds(modalData.cycleId)
  const candidateIndex = candidate && candidates?.findIndex((id) => id === candidate?.id)
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
