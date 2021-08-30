import React from 'react'
import styled from 'styled-components'

import { Loading } from '../../../../common/components/Loading'
import { MainPanel, RowGapBlock } from '../../../../common/components/page/PageContent'
import { TextMedium } from '../../../../common/components/typography'
import { AddMembershipButton } from '../../../../memberships/components/AddMembershipButton'
import { MembersSection } from '../../../../memberships/components/MembersSection'
import { useMyMemberships } from '../../../../memberships/hooks/useMyMemberships'

export function Memberships() {
  const { isLoading, members, active, hasMembers } = useMyMemberships()

  if (isLoading) {
    return <Loading />
  }

  if (!hasMembers) {
    return (
      <MainPanel>
        <NoMemberships gap={16}>
          <h3>You have no active memberships</h3>
          <TextMedium>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </TextMedium>
          <NoMembershipButton size="medium">Create a membership</NoMembershipButton>
        </NoMemberships>
      </MainPanel>
    )
  }

  const otherMemberships = members.filter((member) => !active || active.handle !== member.handle)

  return (
    <MembershipsTable>
      {!!active && <MembersSection title="Active membership" members={[active]} />}
      {!!otherMemberships.length && <MembersSection title="Other memberships" members={otherMemberships} />}
    </MembershipsTable>
  )
}

const NoMembershipButton = styled(AddMembershipButton)`
  grid-area: unset;
  width: fit-content;
`

const NoMemberships = styled(RowGapBlock)`
  place-self: center;
  justify-items: center;
  width: 420px;
  height: fit-content;
  margin-top: 172px;
  text-align: center;
`

const MembershipsTable = styled(MainPanel)`
  grid-row-gap: 28px;
  padding-top: 12px;
`
