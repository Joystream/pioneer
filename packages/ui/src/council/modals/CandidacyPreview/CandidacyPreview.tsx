import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { useModal } from '@/common/hooks/useModal'
import { useCandidate } from '@/council/hooks/useCandidate'
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
  return (
    <MemberModal
      tabs={[
        { title: 'Candidacy', active: activeTab === 'CANDIDACY', onClick: () => setActiveTab('CANDIDACY') },
        { title: 'Member details', active: activeTab === 'DETAILS', onClick: () => setActiveTab('DETAILS') },
        { title: 'Accounts', active: activeTab === 'ACCOUNTS', onClick: () => setActiveTab('ACCOUNTS') },
        { title: 'Roles', active: activeTab === 'ROLES', onClick: () => setActiveTab('ROLES') },
      ]}
      member={candidate?.member}
      isLoading={isLoading}
      isDetailsTab={activeTab === 'DETAILS'}
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
