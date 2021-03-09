import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../api/queries'
import { ButtonGhostMedium } from '../../../components/buttons'
import { EditSymbol } from '../../../components/icons/symbols/EditSymbol'
import { MemberInfo } from '../../../components/MemberInfo'
import { CloseSmallModalButton } from '../../../components/Modal'
import { PageTab, PageTabsNav } from '../../../components/page/PageTabs'
import { Animations, Colors } from '../../../constants'
import { useToggle } from '../../../hooks/useToggle'
import { MemberDetails } from './MemberDetails'

interface MembershipAboutProps {
  member: MemberFieldsFragment
  onClose: () => void
}

export const MembershipAbout = ({ onClose, member }: MembershipAboutProps) => {
  const [isAboutMemberActive, toggleAboutMemberActive] = useToggle(true)

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <SidePaneGlass member={member} onClick={onBackgroundClick} onClose={onClose}>
      <SidePane>
        <SidePaneHeader>
          <CloseSmallModalButton onClick={onClose} />
          <SidePaneTitle>My Profile</SidePaneTitle>
          <MemberInfo member={member} memberSize="l" />
          <PageTabsNav>
            <PageTab active={isAboutMemberActive} onClick={toggleAboutMemberActive}>
              Member details
            </PageTab>
            <PageTab active={false} onClick={toggleAboutMemberActive}>
              Accounts
            </PageTab>
            <PageTab active={false} onClick={toggleAboutMemberActive}>
              Roles
            </PageTab>
          </PageTabsNav>
        </SidePaneHeader>
        <SidePaneBody>
          <MemberDetails member={member} />
        </SidePaneBody>
        <SidePaneFooter>
          <ButtonGhostMedium>
            <EditSymbol />
            Edit My Profile
          </ButtonGhostMedium>
        </SidePaneFooter>
      </SidePane>
    </SidePaneGlass>
  )
}

export const SidePaneGlass = styled.div<MembershipAboutProps>`
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
  grid-template-rows: minmax(auto, 200px) 1fr 72px;
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
  padding: 24px 24px 0;
  background-color: ${Colors.White};
`

const SidePaneTitle = styled.h4`
  line-height: 24px;
`

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
