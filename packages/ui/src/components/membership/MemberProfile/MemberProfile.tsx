import React, { useState } from 'react'
import styled from 'styled-components'
import { useGetMemberQuery } from '../../../api/queries'
import { Animations, Colors } from '../../../constants'
import { useModal } from '../../../hooks/useModal'
import { useMyMemberships } from '../../../hooks/useMyMemberships'
import { EditMembershipButton } from '../../../membership/components/EditMembershipButton'
import { CloseButton } from '../../buttons'
import { EditSymbol } from '../../icons/symbols/EditSymbol'
import { PageTab, PageTabsNav } from '../../page/PageTabs'
import { MemberInfo } from '../MemberInfo'
import { MemberAccounts } from './MemberAccounts'
import { MemberDetails } from './MemberDetails'

type Tabs = 'DETAILS' | 'ACCOUNTS' | 'ROLES'

export const MemberProfile = React.memo(() => {
  const [activeTab, setActiveTab] = useState<Tabs>('DETAILS')
  const { members, isLoading } = useMyMemberships()
  const { modalData, hideModal } = useModal()
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
        <SidePaneFooter>
          {isMyMember && activeTab === 'DETAILS' && (
            <EditMembershipButton member={member} size="medium">
              <EditSymbol />
              Edit My Profile
            </EditMembershipButton>
          )}
        </SidePaneFooter>
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
  grid-template-rows: minmax(auto, 192px) 1fr 72px;
  grid-template-areas:
    'sidepaneheader'
    'sidepanebody'
    'sidepanefooter';
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
  grid-row-gap: 24px;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 200px;
  padding: 16px 24px 0;
  background-color: ${Colors.White};
`

const SidePanelTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

const SidePaneFooter = styled.div`
  display: grid;
  grid-area: sidepanefooter;
  position: relative;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 72px;
  padding: 16px 24px;
  background-color: ${Colors.White};
`
