import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../../../../app/constants'
import { useGetMemberQuery } from '../../../../membership/queries'
import { formatDateString, formatTokenValue } from '../../../model/formatters'
import { BaseMember } from '../../../types'
import { LabelLink } from '../../forms'
import { BlockIcon } from '../../icons/BlockIcon'
import { TransferSymbol } from '../../icons/symbols'
import { TransferInviteButton } from '../../TransferInviteButton'
import { TextSmall, TextMedium } from '../../typography'
import { MembershipLabel } from '../../typography/MembershipLabel'
import { MemberInfo } from '../MemberInfo'

import { EmptyBody } from './MemberProfile'

type Props = { member: BaseMember }

export const MemberDetails = React.memo(({ member }: Props) => {
  const { data, loading } = useGetMemberQuery({
    variables: { id: member.id },
  })

  if (loading || !data || !data.membership) {
    return <EmptyBody>Loading...</EmptyBody>
  }

  const registeredAtBlock = data.membership.registeredAtBlock

  const hired = '-'
  const applied = '-'
  const leader = '-'
  const councilMember = '-'
  const slashed = '-'
  const terminated = '-'
  const blogPosts = '-'
  const initiatingLeaving = '-'

  return (
    <AboutTable>
      <AboutColumn>
        <MembershipLabel text="About" />
        <AboutText>{member?.about || ''}</AboutText>
      </AboutColumn>
      <AboutRow>
        <MembershipLabel text="Registered on" />
        <AboutDateColumn>
          <AboutText>{formatDateString(data.membership.registeredAtTime)}</AboutText>
          <Block height={registeredAtBlock.block} network={registeredAtBlock.network} />
        </AboutDateColumn>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Member ID" />
        <AboutText>{member?.id}</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Member Name" />
        <AboutText>{member?.name}</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Invitations Left" />
        <AboutInvite>
          <AboutText>{member?.inviteCount}</AboutText>
          <TransferInviteButton member={member} square={false}>
            <TransferSymbol />
            Transfer Invites
          </TransferInviteButton>
        </AboutInvite>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Invited" />
        <AboutDateColumn>
          {(data.membership.invitees || []).map((member) => (
            <MemberInfo member={member} key={member.handle} />
          ))}
        </AboutDateColumn>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Hired" />
        <AboutText>{hired} times</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Applied" />
        <AboutText>{applied} times</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Being A leader" />
        <AboutText>{leader} times</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Being Council Member" />
        <AboutText>{councilMember} times</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Slashed" />
        <AboutText>{slashed} times</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Terminated" />
        <AboutText>{terminated} times</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Initiating leaving" />
        <AboutText>{initiatingLeaving}</AboutText>
      </AboutRow>
      <AboutRow>
        <MembershipLabel text="Blog posts" />
        <AboutText>{blogPosts}</AboutText>
      </AboutRow>
    </AboutTable>
  )
})

interface BlockInfoProps {
  height: number
  network: string
}

const Block = React.memo(({ height, network }: BlockInfoProps) => (
  <BlockInfo>
    <BlockIcon />
    <BlockNumber>{formatTokenValue(height)}</BlockNumber>
    <BlockNetworkInfo>on {network} network</BlockNetworkInfo>
  </BlockInfo>
))

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
const AboutText = styled(TextMedium)`
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
const BlockNetworkInfo = styled(TextSmall)`
  color: ${Colors.Black[400]};
`
const BlockNumber = styled(LabelLink)`
  font-size: inherit;
  line-height: inherit;
  transition: ${Transitions.all};
`
const AboutInvite = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
