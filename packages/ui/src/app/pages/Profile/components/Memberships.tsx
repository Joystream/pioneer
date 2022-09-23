import React from 'react'
import styled from 'styled-components'

import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { Loading } from '@/common/components/Loading'
import { MainPanel } from '@/common/components/page/PageContent'
import { AddMembershipButton } from '@/memberships/components/AddMembershipButton'
import { MembersSection } from '@/memberships/components/MembersSection'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export function Memberships() {
  const { isLoading, members, active, hasMembers } = useMyMemberships()

  if (isLoading) {
    return <Loading />
  }

  if (!hasMembers) {
    return (
      <EmptyPagePlaceholder
        title="You have no active memberships"
        copy="Membership is required for participation in the DAO activities and beneficial for accumulating the stats and
            reputation within the community"
        button={<NoMembershipButton size="medium">Create a membership</NoMembershipButton>}
      />
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

const MembershipsTable = styled(MainPanel)`
  grid-row-gap: 28px;
  padding-top: 12px;
`
