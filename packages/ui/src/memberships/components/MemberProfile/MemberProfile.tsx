import React, { useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, CloseButton } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { EmptyBody } from '@/proposals/modals/VoteRationale/VoteRationale'

import { MemberInfoWrap } from '..'
import { EditSymbol } from '../../../common/components/icons/symbols'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
  SidePaneTopButtonsGroup,
} from '../../../common/components/SidePane'
import { Tabs } from '../../../common/components/Tabs'
import { useModal } from '../../../common/hooks/useModal'
import { useMember } from '../../hooks/useMembership'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { EditMembershipButton } from '../EditMembershipButton'
import { MemberInfo } from '../MemberInfo'

import { MemberAccounts } from './MemberAccounts'
import { MemberDetails } from './MemberDetails'
import { MemberSideRoles } from './MemberRoles'
import { MemberModalCall } from './types'

type ProfileTabs = 'DETAILS' | 'ACCOUNTS' | 'ROLES'

export const MemberProfile = React.memo(() => {
  const [activeTab, setActiveTab] = useState<ProfileTabs>('DETAILS')
  const { members, isLoading } = useMyMemberships()
  const { modalData, hideModal } = useModal<MemberModalCall>()
  const { isLoading: loading, member } = useMember(modalData.id)
  const { copyValue } = useCopyToClipboard()

  const isMyMember = !isLoading && !!members.find((m) => m.id == member?.id)

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

  if (loading || !member) {
    return (
      <SidePaneGlass onClick={onBackgroundClick}>
        <SidePane>
          <SidePaneBody>
            <EmptyBody>Loading...</EmptyBody>
          </SidePaneBody>
        </SidePane>
      </SidePaneGlass>
    )
  }

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane>
        <MemberPanelHeader>
          <SidePanelTop>
            <SidePaneTitle>My Profile</SidePaneTitle>
            <SidePaneTopButtonsGroup>
              {isMyMember && activeTab === 'DETAILS' && (
                <EditMembershipButton member={member} size="small">
                  <EditSymbol />
                </EditMembershipButton>
              )}
              <ButtonGhost size="small" onClick={() => copyValue(`${window.location.host}/#/members/${member.id}`)}>
                <LinkIcon />
              </ButtonGhost>
            </SidePaneTopButtonsGroup>
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
          <MemberInfo member={member} memberSize="l" size="l" />
          <Tabs
            tabs={[
              { title: 'Member details', active: activeTab === 'DETAILS', onClick: () => setActiveTab('DETAILS') },
              { title: 'Accounts', active: activeTab === 'ACCOUNTS', onClick: () => setActiveTab('ACCOUNTS') },
              { title: 'Roles', active: activeTab === 'ROLES', onClick: () => setActiveTab('ROLES') },
            ]}
            tabsSize="xs"
          />
        </MemberPanelHeader>
        <SidePaneBody>
          {activeTab === 'DETAILS' && <MemberDetails member={member} />}
          {activeTab === 'ACCOUNTS' && <MemberAccounts member={member} />}
          {activeTab === 'ROLES' && <MemberSideRoles member={member} />}
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})

const MemberPanelHeader = styled(SidePaneHeader)`
  ${MemberInfoWrap} {
    padding-bottom: 4px;
  }
`
