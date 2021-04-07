import React, { useState } from 'react'
import styled from 'styled-components'

import { CloseButton } from '../../../common/components/buttons'
import { EditSymbol } from '../../../common/components/icons/symbols'
import { PageTab, PageTabsNav } from '../../../common/components/page/PageTabs'
import { Animations, Colors } from '../../../common/constants'
import { useModal } from '../../../common/hooks/useModal'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { useGetMemberQuery } from '../../queries'
import { MemberInfoWrap } from '../components'
import { EditMembershipButton } from '../EditMembershipButton'
import { MemberInfo } from '../MemberInfo'

import { MemberAccounts } from './MemberAccounts'
import { MemberDetails } from './MemberDetails'
import { MemberModalCall } from './types'

type Tabs = 'DETAILS' | 'ACCOUNTS' | 'ROLES'

export const MemberProfile = React.memo(() => {
  const [activeTab, setActiveTab] = useState<Tabs>('DETAILS')
  const { members, isLoading } = useMyMemberships()
  const { modalData, hideModal } = useModal<MemberModalCall>()
  const { data, loading } = useGetMemberQuery({ variables: { id: modalData.id } })

  const member = data?.membership
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
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>My Profile</SidePaneTitle>
            {isMyMember && activeTab === 'DETAILS' && (
              <EditMembershipButton member={member}>
                <EditSymbol />
              </EditMembershipButton>
            )}
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
          <MemberInfo member={member} memberSize="l" size="l" />
          <PageTabsNav>
            <PageTab active={activeTab === 'DETAILS'} onClick={() => setActiveTab('DETAILS')}>
              Member details
            </PageTab>
            <PageTab active={activeTab === 'ACCOUNTS'} onClick={() => setActiveTab('ACCOUNTS')}>
              Accounts
            </PageTab>
            <PageTab active={activeTab === 'ROLES'} onClick={() => setActiveTab('ROLES')}>
              Roles
            </PageTab>
          </PageTabsNav>
        </SidePaneHeader>
        <SidePaneBody>
          {activeTab === 'DETAILS' && <MemberDetails member={member} />}
          {activeTab === 'ACCOUNTS' && <MemberAccounts member={member} />}
          {activeTab === 'ROLES' && <EmptyBody>Roles</EmptyBody>}
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})

export const SidePaneGlass = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.Black[700.85]};
  color: ${Colors.Black[900]};
  z-index: 100000;
  ${Animations.showModalBackground};
`

const SidePane = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(auto, 192px) 1fr;
  grid-template-areas:
    'sidepaneheader'
    'sidepanebody';
  grid-area: modal;
  position: relative;
  background-color: ${Colors.White};
  width: 100%;
  max-width: 552px;
  height: 100vh;
  overflow: hidden;
  ${Animations.showSidePane};
`

const SidePaneHeader = styled.div`
  display: grid;
  grid-area: sidepaneheader;
  grid-row-gap: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 200px;
  padding: 12px 24px 0;
  background-color: ${Colors.White};

  ${MemberInfoWrap} {
    padding-bottom: 4px;
  }
`

const SidePanelTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 32px 20px;
  grid-column-gap: 14px;
  align-items: center;
  width: 100%;
`

const SidePaneTitle = styled.h5``

const SidePaneBody = styled.div`
  display: flex;
  grid-area: sidepanebody;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: ${Colors.Black[50]};
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const EmptyBody = styled.div`
  padding: 24px;
`
