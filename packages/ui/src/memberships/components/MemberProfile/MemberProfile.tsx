import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { useModal } from '@/common/hooks/useModal'

import { useMember } from '../../hooks/useMembership'

import { MemberAccounts } from './MemberAccounts'
import { MemberDetails } from './MemberDetails'
import { MemberModal } from './MemberModal'
import { MemberSideRoles } from './MemberRoles'
import { MemberModalCall } from './types'

type ProfileTabs = 'DETAILS' | 'ACCOUNTS' | 'ROLES'

export const MemberProfile = React.memo(() => {
  const [activeTab, setActiveTab] = useState<ProfileTabs>('DETAILS')
  const { modalData } = useModal<MemberModalCall>()
  const { isLoading, member } = useMember(modalData.id)
  return (
    <MemberModal
      tabs={[
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
          {activeTab === 'DETAILS' && <MemberDetails member={member} />}
          {activeTab === 'ACCOUNTS' && <MemberAccounts member={member} />}
          {activeTab === 'ROLES' && <MemberSideRoles member={member} />}
        </>
      )}
    </MemberModal>
  )
})
