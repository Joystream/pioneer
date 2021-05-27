import React from 'react'
import styled from 'styled-components'

import { Loading } from '../../../../common/components/Loading'
import { MainPanel } from '../../../../common/components/page/PageContent'
import { TextMedium } from '../../../../common/components/typography'
import { AddMembershipButton } from '../../../../memberships/components/AddMembershipButton'
import { MembersSection } from '../../../../memberships/components/MembersSection'
import { useMyMemberships } from '../../../../memberships/hooks/useMyMemberships'

export function Memberships() {
  const { isLoading, members, active } = useMyMemberships()

  if (isLoading) {
    return <Loading />
  }

  if (!members.length) {
    return (
      <NoMemberships>
        <NoMembershipsInfo>
          <h3>You have no active membership</h3>
          <TextMedium>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </TextMedium>
        </NoMembershipsInfo>
        <NoMembershipButton size="medium">Create a membership</NoMembershipButton>
      </NoMemberships>
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
