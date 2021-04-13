import React from 'react'
import styled from 'styled-components'

import { LabelLink } from '../../../common/components/forms'
import { BlockIcon } from '../../../common/components/icons/BlockIcon'
import { TransferSymbol } from '../../../common/components/icons/symbols'
import { TextMedium, TextSmall } from '../../../common/components/typography'
import { MembershipLabel } from '../../../common/components/typography/MembershipLabel'
import { Colors, Transitions } from '../../../common/constants'
import { formatDateString, formatTokenValue } from '../../../common/model/formatters'
import { useMember } from '../../hooks/useMembership'
import { MemberInternal } from '../../types'
import { MemberInfo } from '../MemberInfo'
import { TransferInviteButton } from '../TransferInviteButton'

import { EmptyBody } from './MemberProfile'

type Props = { member: MemberInternal }

export const MemberDetails = React.memo(({ member }: Props) => {
  const { member: memberDetails, isLoading } = useMember(member.id)

  if (isLoading || !memberDetails) {
    return <EmptyBody>Loading...</EmptyBody>
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
    <AboutTable>
      <AboutColumn>
        <MembershipLabel text="About" />
        <AboutText>{memberDetails?.about || ''}</AboutText>
      </AboutColumn>
      <AboutRow>
        <MembershipLabel text="Registered on" />
        <AboutDateColumn>
          <AboutText>{formatDateString(memberDetails.registeredAtTime)}</AboutText>
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
          {(memberDetails.invitees || []).map((member) => (
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
