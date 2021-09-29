import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { useModal } from '@/common/hooks/useModal'
import { MemberDetails, MemberModalCall } from '@/memberships/components/MemberProfile'
import { MemberAccounts } from '@/memberships/components/MemberProfile/MemberAccounts'
import { MemberModal } from '@/memberships/components/MemberProfile/MemberModal'
import { MemberSideRoles } from '@/memberships/components/MemberProfile/MemberRoles'
import { useMember } from '@/memberships/hooks/useMembership'

import { CandidacyDetails } from './CandidacyDetails'

type ProfileTabs = 'CANDIDACY' | 'DETAILS' | 'ACCOUNTS' | 'ROLES'

export const CandidacyPreview = React.memo(() => {
  const [activeTab, setActiveTab] = useState<ProfileTabs>('CANDIDACY')
  const { modalData } = useModal<MemberModalCall>()
  const { isLoading, member } = useMember(modalData.id)
  return (
    <MemberModal
      tabs={[
        { title: 'Candidacy', active: activeTab === 'CANDIDACY', onClick: () => setActiveTab('CANDIDACY') },
        { title: 'Member details', active: activeTab === 'DETAILS', onClick: () => setActiveTab('DETAILS') },
        { title: 'Accounts', active: activeTab === 'ACCOUNTS', onClick: () => setActiveTab('ACCOUNTS') },
        { title: 'Roles', active: activeTab === 'ROLES', onClick: () => setActiveTab('ROLES') },
      ]}
      member={member}
      isLoading={isLoading}
      isDetailsTab={activeTab === 'DETAILS'}
    >
      {!member ? (
        <Loading />
      ) : (
        <>
          {activeTab === 'CANDIDACY' && <CandidacyDetails />}
          {activeTab === 'DETAILS' && <MemberDetails member={member} />}
          {activeTab === 'ACCOUNTS' && <MemberAccounts member={member} />}
          {activeTab === 'ROLES' && <MemberSideRoles member={member} />}
        </>
      )}
    </MemberModal>
  )
})
