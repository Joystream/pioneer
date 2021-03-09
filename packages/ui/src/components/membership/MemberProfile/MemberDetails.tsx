import React from 'react'
import styled from 'styled-components'
import { useGetMemberQuery } from '../../../api/queries'
import { BaseMember } from '../../../common/types'
import { Colors } from '../../../constants'
import { formatDateString, formatTokenValue } from '../../../utils/formatters'
import { ButtonGhostSmall } from '../../buttons'
import { LabelLink } from '../../forms'
import { BlockIcon } from '../../icons/BlockIcon'
import { TransferSymbol } from '../../icons/symbols/TransferSymbol'
import { Text } from '../../typography'
import { MembershipLabel } from '../../typography/MembershipLabel'
import { MemberInfo } from '../MemberInfo'
import { EmptyBody } from './MemberProfile'

interface Props {
  member: BaseMember
}

export const MemberDetails = ({ member }: Props) => {
  const { data, loading } = useGetMemberQuery({
    variables: { id: member.id },
  })

  if (loading || !data || !data.member) {
    return <EmptyBody>Loading...</EmptyBody>
  }

  const registeredAtBlock = data.member.registeredAtBlock

  const hired = 3
  const applied = 10
  const leader = 4
  const councilMember = 3
  const slashed = 0
  const terminated = 2
  const blogPosts = 42
  const initiatingLeaving = 10
  const invitees = data.member.invitees || []

  return (
    <AboutTable>
      <AboutColumn>
        <MembershipLabel text="About" />
        <AboutText size={2}>{member?.about || ''}</AboutText>
      </AboutColumn>
      <AboutRow>
        <MembershipLabel text="Registered on" />
        <AboutDateColumn>
          <AboutText size={2}>{formatDateString(registeredAtBlock.timestamp)}</AboutText>
          <BlockInfo>
            <BlockIcon />
            <BlockNumber>{formatTokenValue(registeredAtBlock.height)}</BlockNumber>
            <BlockNetworkInfo size={3}>on ${registeredAtBlock.network} network</BlockNetworkInfo>
          </BlockInfo>
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
          {invitees.map((member) => (
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
  )
}
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
const BlockInfo = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${Colors.Black[400]};
`
const BlockNetworkInfo = styled(Text)`
  color: ${Colors.Black[400]};
`
const BlockNumber = styled(LabelLink)`
  font-size: inherit;
  line-height: inherit;
`
const AboutInvite = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
