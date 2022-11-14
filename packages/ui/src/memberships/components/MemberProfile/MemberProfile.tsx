import React, { useState } from 'react'

import { MembersRoutes } from '@/app/constants/routes'
import { CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { EditSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import { SidePaneTopButtonsGroup } from '@/common/components/SidePane'
import { ReportImageButton } from '@/common/components/UserImage/ReportImageButton'
import { useIsImageBlacklisted } from '@/common/hooks/useIsImageBlacklisted'
import { useModal } from '@/common/hooks/useModal'
import { getUrl } from '@/common/utils/getUrl'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { useMember } from '../../hooks/useMembership'
import { EditMembershipButton } from '../EditMembershipButton'

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
  const { members } = useMyMemberships()
  const isMyMember = !!members.find((m) => m.id == member?.id)
  const isDetailsTab = activeTab === 'DETAILS'
  const isAvatarBlacklisted = useIsImageBlacklisted(member?.avatar)

  return (
    <MemberModal
      title={isMyMember ? 'My Profile' : 'Profile'}
      tabs={[
        { title: 'Member details', active: activeTab === 'DETAILS', onClick: () => setActiveTab('DETAILS') },
        { title: 'Accounts', active: activeTab === 'ACCOUNTS', onClick: () => setActiveTab('ACCOUNTS') },
        { title: 'Working Group Roles', active: activeTab === 'ROLES', onClick: () => setActiveTab('ROLES') },
      ]}
      member={member}
      isLoading={isLoading}
      contextButtons={
        <SidePaneTopButtonsGroup>
          {member && isMyMember && isDetailsTab && (
            <EditMembershipButton member={member} size="small">
              <EditSymbol />
            </EditMembershipButton>
          )}
          {!isMyMember && !isAvatarBlacklisted && <ReportImageButton text="Report avatar" src={member?.avatar} />}
          <CopyButtonTemplate
            square
            size="small"
            textToCopy={getUrl({ route: MembersRoutes.members, params: { id: member?.id } })}
            icon={<LinkIcon />}
          />
        </SidePaneTopButtonsGroup>
      }
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
