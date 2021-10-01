import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { CloseButton, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { EditSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
  SidePaneTopButtonsGroup,
} from '@/common/components/SidePane'
import { TabProps, Tabs } from '@/common/components/Tabs'
import { useEscape } from '@/common/hooks/useEscape'
import { useModal } from '@/common/hooks/useModal'
import { Member } from '@/memberships/types'
import { EmptyBody } from '@/proposals/modals/VoteRationale/VoteRationale'

import { MemberInfoWrap } from '..'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { EditMembershipButton } from '../EditMembershipButton'
import { MemberInfo } from '../MemberInfo'

interface Props {
  member?: Member
  isLoading?: boolean
  tabs: TabProps[]
  children: ReactNode
  isDetailsTab?: boolean
}

export const MemberModal = React.memo(({ member, isLoading, tabs, children, isDetailsTab }: Props) => {
  const { hideModal } = useModal()
  const { members } = useMyMemberships()
  const isMyMember = !!members.find((m) => m.id == member?.id)

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

  useEscape(() => hideModal())

  if (isLoading || !member) {
    return (
      <SidePaneGlass onClick={onBackgroundClick}>
        <SidePane>
          <SidePaneBody>
            <EmptyBody>
              <Loading />
            </EmptyBody>
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
              {isMyMember && isDetailsTab && (
                <EditMembershipButton member={member} size="small">
                  <EditSymbol />
                </EditMembershipButton>
              )}
              <CopyButtonTemplate
                square
                size="small"
                textToCopy={`${window.location.host}/#/members/${member.id}`}
                icon={<LinkIcon />}
              />
            </SidePaneTopButtonsGroup>
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
          <MemberInfo member={member} memberSize="l" size="l" skipModal />
          <Tabs tabs={tabs} tabsSize="xs" />
        </MemberPanelHeader>
        <SidePaneBody>{children}</SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})

const MemberPanelHeader = styled(SidePaneHeader)`
  ${MemberInfoWrap} {
    padding-bottom: 4px;
  }
`
