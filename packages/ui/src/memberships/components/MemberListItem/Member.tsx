import React from 'react'
import styled from 'styled-components'

import { AccountLocks } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { TokenValue } from '@/common/components/typography/TokenValue'
import { Colors } from '@/common/constants'
import { MemberSearchFilter } from '@/memberships/components/MemberListFilters'
import { MemberCreated } from '@/memberships/components/MemberListItem/components/MemberCreated'
import { MemberReferrer } from '@/memberships/components/MemberListItem/components/MemberReferrer'
import { Socials, socialToIcon } from '@/memberships/components/SocialMediaTile/SocialMediaTile'
import { useMemberRowWorkDetails } from '@/memberships/hooks/useMemberRowWorkDetails'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'
import { MemberWithDetails } from '@/memberships/types'

import { MemberInfo } from '..'
import { MemberRoles } from '../MemberRoles'

import { CountInfo, MemberColumn, MemberItemWrap, MemberRolesColumn } from './Fields'

interface MemberListItemProps {
  member: MemberWithDetails
  searchFilter?: MemberSearchFilter
}

const EMPTY_SEARCH_FILTERS: MemberSearchFilter[] = ['Membership', 'Membership_ID', 'Account_Address']

export const MemberListItem = ({ member, searchFilter }: MemberListItemProps) => {
  const balance = useBalance(member.controllerAccount)
  const { slashed, terminated } = useMemberRowWorkDetails(member)
  const showMemberModal = useShowMemberModal(member.id)

  return (
    <Wrapper>
      <MemberItemWrap onClick={showMemberModal} kind={searchFilter ? 'MemberWithExternal' : 'Member'}>
        <MemberColumn>
          <MemberInfo member={member} hideGroup withID />
        </MemberColumn>

        <MemberRolesColumn>
          <MemberRoles wrapable roles={member.roles} size="l" />
        </MemberRolesColumn>

        <MemberColumn>
          <MemberCreated member={member} />
        </MemberColumn>

        <MemberColumn>
          <MemberReferrer member={member} />
        </MemberColumn>

        <MemberColumn>
          <CountInfo count={slashed} />
        </MemberColumn>
        <MemberColumn>
          <CountInfo count={terminated} />
        </MemberColumn>

        <MemberColumn>
          <TokenValue value={balance?.total} />
        </MemberColumn>

        <MemberColumn>
          <TokenValue value={balance?.locked} />
          <AccountLocks locks={balance?.locks} />
        </MemberColumn>
      </MemberItemWrap>
      {searchFilter && !EMPTY_SEARCH_FILTERS.includes(searchFilter) && (
        <ExternalInfo>
          {socialToIcon[searchFilter.toUpperCase() as Socials]}
          {member.externalResources?.find((externalResource) => externalResource.source === searchFilter.toUpperCase())
            ?.value ?? searchFilter}
        </ExternalInfo>
      )}
    </Wrapper>
  )
}

const ExternalInfo = styled.div`
  padding: 10px 20px;
  background-color: ${Colors.Black[50]};
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid ${Colors.Black[100]};
  border-top: none;
`

const Wrapper = styled.div`
  &:hover,
  &:focus,
  &:focus-within {
    > * {
      z-index: 1;
      border-color: ${Colors.Blue[100]};
    }
  }
`
