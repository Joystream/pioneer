import React from 'react'
import styled from 'styled-components'

import { AboutDateColumn } from '../../../common/components/AboutDateColumn'
import { TransferSymbol } from '../../../common/components/icons/symbols'
import { Loading } from '../../../common/components/Loading'
import {
  SidePaneTable,
  SidePaneColumn,
  SidePaneText,
  SidePaneRow,
  SidePaneLabel,
} from '../../../common/components/SidePane'
import { useMember } from '../../hooks/useMembership'
import { Member } from '../../types'
import { MemberInfo } from '../MemberInfo'
import { TransferInviteButton } from '../TransferInviteButton'

import { EmptyBody } from './MemberProfile'

type Props = { member: Member }

export const MemberDetails = React.memo(({ member }: Props) => {
  const { member: memberDetails, isLoading } = useMember(member.id)

  if (isLoading || !memberDetails) {
    return (
      <EmptyBody>
        <Loading />
      </EmptyBody>
    )
  }

  const registeredAtBlock = memberDetails.registeredAtBlock

  const hired = '-'
  const applied = '-'
  const leader = '-'
  const councilMember = '-'
  const slashed = '-'
  const terminated = '-'
  const blogPosts = '-'
  const initiatingLeaving = '-'

  return (
    <SidePaneTable>
      <SidePaneColumn>
        <SidePaneLabel text="About" />
        <SidePaneText>{memberDetails?.about || ''}</SidePaneText>
      </SidePaneColumn>
      <SidePaneRow>
        <SidePaneLabel text="Registered on" />
        <AboutDateColumn time={memberDetails.registeredAtTime} block={registeredAtBlock} />
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Member ID" />
        <SidePaneText>{member?.id}</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Member Name" />
        <SidePaneText>{member?.name}</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Invitations Left" />
        <AboutInvite>
          <SidePaneText>{member?.inviteCount}</SidePaneText>
          <TransferInviteButton member={member} square={false}>
            <TransferSymbol />
            Transfer Invites
          </TransferInviteButton>
        </AboutInvite>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Invited" />
        <AboutInvitesColumn>
          {(memberDetails.invitees || []).map((member) => (
            <MemberInfo member={member} key={member.handle} />
          ))}
        </AboutInvitesColumn>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Hired" />
        <SidePaneText>{hired} times</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Applied" />
        <SidePaneText>{applied} times</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Being A leader" />
        <SidePaneText>{leader} times</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Being Council Member" />
        <SidePaneText>{councilMember} times</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Slashed" />
        <SidePaneText>{slashed} times</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Terminated" />
        <SidePaneText>{terminated} times</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Initiating leaving" />
        <SidePaneText>{initiatingLeaving}</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Blog posts" />
        <SidePaneText>{blogPosts}</SidePaneText>
      </SidePaneRow>
    </SidePaneTable>
  )
})

const AboutInvitesColumn = styled.div`
  display: grid;
  grid-row-gap: 4px;
  width: 100%;
  height: fit-content;
`
const AboutInvite = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
