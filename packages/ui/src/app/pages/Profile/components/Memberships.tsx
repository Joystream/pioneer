import React from 'react'
import styled from 'styled-components'

import { ButtonsGroup } from '../../../../common/components/buttons'
import { Loading } from '../../../../common/components/Loading'
import { MainPanel } from '../../../../common/components/page/PageContent'
import { TextMedium } from '../../../../common/components/typography'
import { AddMembershipButton } from '../../../../memberships/components/AddMembershipButton'
import { InviteMemberButton } from '../../../../memberships/components/InviteMemberButton'
import { MembersSection } from '../../../../memberships/components/MembersSection'
import { useMyMemberships } from '../../../../memberships/hooks/useMyMemberships'

export function Memberships() {
  const { count, isLoading, members, active } = useMyMemberships()
  const hasMemberships = !!count

  if (isLoading) {
    return <Loading />
  }

  if (!hasMemberships) {
    return (
      <NoMemberships>
        <NoMembershipsInfo>
          <h3>You have no active membership</h3>
          <TextMedium>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </TextMedium>
        </NoMembershipsInfo>
        <NoMembershipButton>Create a membership</NoMembershipButton>
      </NoMemberships>
    )
  }

  const otherMemberships = members.filter((member) => !active || active.handle !== member.handle)

  return (
    <MembershipsTable>
      <NewMembers>
        <InviteMemberButton size="medium">Invite a member</InviteMemberButton>
        <AddMembershipButton size="medium">Add Membership</AddMembershipButton>
      </NewMembers>
      {!!active && <MembersSection title="Active membership" members={[active]} />}
      {!!otherMemberships.length && <MembersSection title="Other memberships" members={otherMemberships} />}
    </MembershipsTable>
  )
}

const NoMembershipButton = styled(AddMembershipButton)`
  grid-area: none;
  margin-top: 24px;
`

const NoMemberships = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 420px;
  margin: 124px auto 0;
`

const NoMembershipsInfo = styled.div`
  width: 100%;

  ${TextMedium} {
    margin-top: 16px;
  }
`

const MembershipsTable = styled(MainPanel)`
  position: relative;
  grid-row-gap: 28px;
  padding-top: 8px;
`

const NewMembers = styled(ButtonsGroup)`
  position: absolute;
  right: 0;
  top: 0;
`
