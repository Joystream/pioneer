import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { TransferSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import {
  SidePaneTable,
  SidePaneColumn,
  SidePaneText,
  SidePaneRow,
  SidePaneLabel,
  EmptyBody,
} from '@/common/components/SidePane'
import { capitalizeFirstLetter } from '@/common/helpers'
import { useIsMyMembership } from '@/memberships/hooks/useIsMyMembership'
import { useMemberExtraInfo } from '@/memberships/hooks/useMemberExtraInfo'

import { useMember } from '../../hooks/useMembership'
import { Member } from '../../types'
import { MemberInfo } from '../MemberInfo'
import { TransferInviteButton } from '../TransferInviteButton'

type Props = { member: Member }

export const MemberDetails = React.memo(({ member }: Props) => {
  const { member: memberDetails, isLoading } = useMember(member.id)
  const isMyMembership = useIsMyMembership(member.id)

  const {
    applied = '-',
    slashed = '-',
    terminated = '-',
    blogPosts = '-',
    councilMember = '-',
    initiatingLeaving = '-',
  } = useMemberExtraInfo(member)

  if (isLoading || !memberDetails) {
    return (
      <EmptyBody>
        <Loading />
      </EmptyBody>
    )
  }

  const hired = member.roles.length
  const lead = member.roles.filter(({ isLead }) => isLead).length

  return (
    <SidePaneTable>
      {memberDetails?.about && (
        <SidePaneColumn>
          <SidePaneLabel text="About" />
          <SidePaneText>{memberDetails.about}</SidePaneText>
        </SidePaneColumn>
      )}
      {memberDetails.entry.type !== 'genesis' && (
        <SidePaneRow>
          <SidePaneLabel text="Registered on" />
          <BlockTime block={memberDetails.entry.block} />
        </SidePaneRow>
      )}
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
          {isMyMembership && (
            <TransferInviteButton member={member} square={false}>
              <TransferSymbol />
              Transfer Invites
            </TransferInviteButton>
          )}
        </AboutInvite>
      </SidePaneRow>
      {!!memberDetails.invitees.length && (
        <SidePaneRow>
          <SidePaneLabel text="Invited" />
          <AboutInvitesColumn>
            {memberDetails.invitees.map((member) => (
              <MemberInfo
                member={member}
                memberSize="s"
                showIdOrText={`Invited on: ${member.createdAt}`}
                key={member.handle}
              />
            ))}
          </AboutInvitesColumn>
        </SidePaneRow>
      )}
      <SidePaneRow>
        <SidePaneLabel text="Hired" />
        <SidePaneText>{hired} times</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Applied" />
        <SidePaneText>{applied} times</SidePaneText>
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="Being A Lead" />
        <SidePaneText>{lead} times</SidePaneText>
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
        <SidePaneLabel text="Forum posts" />
        <SidePaneText>{blogPosts}</SidePaneText>
      </SidePaneRow>
      {memberDetails?.externalResources &&
        memberDetails.externalResources.map((externalResource) => (
          <SidePaneRow key={`${externalResource.source}-externalResources`}>
            <SidePaneLabel text={capitalizeFirstLetter(externalResource.source.toLowerCase())} />
            <SidePaneText>{externalResource.value}</SidePaneText>
          </SidePaneRow>
        ))}
    </SidePaneTable>
  )
})

const AboutInvitesColumn = styled.div`
  display: grid;
  grid-row-gap: 8px;
  width: 100%;
  height: fit-content;
`
const AboutInvite = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
