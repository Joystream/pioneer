import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment, useGetMemberQuery } from '../../../api/queries'
import { ButtonGhostMedium, ButtonGhostSmall } from '../../../components/buttons'
import { LabelLink } from '../../../components/forms'
import { BabylonIcon } from '../../../components/icons/BabylonIcon'
import { EditSymbol } from '../../../components/icons/symbols/EditSymbol'
import { TransferSymbol } from '../../../components/icons/symbols/TransferSymbol'
import { MemberInfo } from '../../../components/MemberInfo'
import { CloseSmallModalButton } from '../../../components/Modal'
import { PageTab, PageTabsNav } from '../../../components/page/PageTabs'
import { Text } from '../../../components/typography'
import { MembershipLabel } from '../../../components/typography/MembershipLabel'
import { Animations, Colors } from '../../../constants'
import { useToggle } from '../../../hooks/useToggle'

interface MembershipAboutProps {
  member: MemberFieldsFragment
  onClose: () => void
}

export const MembershipAbout = ({ onClose, member }: MembershipAboutProps) => {
  const [isAboutMemberActive, toggleAboutMemberActive] = useToggle(true)
  const { data, loading } = useGetMemberQuery({
    variables: { id: member.id },
  })

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const hired = 3
  const applied = 10
  const leader = 4
  const councilMember = 3
  const slashed = 0
  const terminated = 2
  const blogPosts = 42
  const initiatingLeaving = 10
  const registeredDate = '01/07/2020, 10:00am CET'
  const registeredBlock = '389,829'
  const registeredNetwork = 'on Babylon network'
  const invited: MemberFieldsFragment[] = [
    {
      __typename: 'Member',
      id: '123',
      name: 'Doe_J',
      handle: 'doj',
      rootAccount: 'foo',
      controllerAccount: 'bar',
      isFoundingMember: false,
      isVerified: false,
      inviteCount: 0,
    },
  ]

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
          {loading || !data ? (
            <>Loading...</>
          ) : (
            <AboutTable>
              <AboutColumn>
                <MembershipLabel text="About" />
                <AboutText size={2}>{member?.about || ''}</AboutText>
              </AboutColumn>
              <AboutRow>
                <MembershipLabel text="Registered on" />
                <AboutDateColumn>
                  <AboutText size={2}>{registeredDate}</AboutText>
                  <BabylonInfo>
                    <BabylonIcon />
                    <BabylonCount href="#">{registeredBlock}</BabylonCount>
                    <BabylonText size={3}>{registeredNetwork}</BabylonText>
                  </BabylonInfo>
                </AboutDateColumn>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Member ID" />
                <AboutText size={2}>{member?.id}</AboutText>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Invitations Left" />
                <AboutInvite>
                  <AboutText size={2}>{member?.inviteCount}</AboutText>
                  <ButtonGhostSmall>
                    <TransferSymbol />
                    Transfer Invites
                  </ButtonGhostSmall>
                </AboutInvite>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Invited" />
                <AboutDateColumn>
                  {invited.map((member) => (
                    <MemberInfo member={member} key={member.handle} />
                  ))}
                </AboutDateColumn>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Hired" />
                <AboutText size={2}>{hired} times</AboutText>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Applied" />
                <AboutText size={2}>{applied} times</AboutText>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Being A leader" />
                <AboutText size={2}>{leader} times</AboutText>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Being Council Member" />
                <AboutText size={2}>{councilMember} times</AboutText>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Slashed" />
                <AboutText size={2}>{slashed} times</AboutText>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Terminated" />
                <AboutText size={2}>{terminated} times</AboutText>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Initiating leaving" />
                <AboutText size={2}>{initiatingLeaving}</AboutText>
              </AboutRow>
              <AboutRow>
                <MembershipLabel text="Blog posts" />
                <AboutText size={2}>{blogPosts}</AboutText>
              </AboutRow>
            </AboutTable>
          )}
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

const AboutTable = styled.ul`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
  height: 100%;
  padding: 24px;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    visibility: hidden;
  }
`

const AboutColumn = styled.li`
  display: grid;
  grid-row-gap: 8px;
  width: 100%;
  height: fit-content;
`

const AboutRow = styled.li`
  display: grid;
  grid-template-columns: 168px 1fr;
  grid-column-gap: 24px;
`

const AboutText = styled(Text)`
  color: ${Colors.Black[600]};
`

const AboutDateColumn = styled.div`
  display: grid;
  grid-row-gap: 4px;
  width: 100%;
  height: fit-content;
`

const BabylonInfo = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${Colors.Black[400]};
`

const BabylonText = styled(Text)`
  color: ${Colors.Black[400]};
`

const BabylonCount = styled(LabelLink)`
  font-size: inherit;
  line-height: inherit;
`

const AboutInvite = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
