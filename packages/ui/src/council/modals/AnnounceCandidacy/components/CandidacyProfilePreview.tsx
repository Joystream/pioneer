import React, { useState } from 'react'

import { CandidacyDetails } from '@/council/modals/CandidacyPreview/CandidacyDetails'
import { CandidacyPreviewTabs } from '@/council/modals/CandidacyPreview/CandidacyPreview'
import { ElectionCandidateWithDetails } from '@/council/types'
import { MemberDetails } from '@/memberships/components/MemberProfile'
import { MemberAccounts } from '@/memberships/components/MemberProfile/MemberAccounts'
import { MemberModal } from '@/memberships/components/MemberProfile/MemberModal'
import { MemberSideRoles } from '@/memberships/components/MemberProfile/MemberRoles'

interface CandidacyProfilePreviewProps {
  candidate: ElectionCandidateWithDetails
  closeModal: () => void
}

export const CandidacyProfilePreview = ({ candidate, closeModal }: CandidacyProfilePreviewProps) => {
  const [activeTab, setActiveTab] = useState<CandidacyPreviewTabs>('CANDIDACY')

  return (
    <MemberModal
      title="Candidacy Profile Preview"
      tabs={[
        { title: 'Candidacy', active: activeTab === 'CANDIDACY', onClick: () => setActiveTab('CANDIDACY') },
        { title: 'Member details', active: activeTab === 'DETAILS', onClick: () => setActiveTab('DETAILS') },
        { title: 'Accounts', active: activeTab === 'ACCOUNTS', onClick: () => setActiveTab('ACCOUNTS') },
        { title: 'Roles', active: activeTab === 'ROLES', onClick: () => setActiveTab('ROLES') },
      ]}
      member={candidate?.member}
      closeModal={closeModal}
    >
      {activeTab === 'CANDIDACY' && <CandidacyDetails candidate={candidate} />}
      {activeTab === 'DETAILS' && <MemberDetails member={candidate.member} />}
      {activeTab === 'ACCOUNTS' && <MemberAccounts member={candidate.member} />}
      {activeTab === 'ROLES' && <MemberSideRoles member={candidate.member} />}
    </MemberModal>
  )
}
