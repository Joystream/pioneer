import React from 'react'
import styled from 'styled-components'

import { AccountLocks } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TokenValue } from '@/common/components/typography/TokenValue'
import { Colors } from '@/common/constants'
import { MemberSearchFilter } from '@/memberships/components/MemberListFilters'
import { Socials, socialToIcon } from '@/memberships/components/SocialMediaTile/SocialMediaTile'
import { useMemberRowWorkDetails } from '@/memberships/hooks/useMemberRowWorkDetails'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'

import { MemberInfo } from '..'
import { Member } from '../../types'
import { MemberRoles } from '../MemberRoles'

import { CountInfo, Info, MemberColumn, MemberItemWrap, MemberModalTrigger, MemberRolesColumn } from './Fileds'

interface MemberListItemProps {
  member: Member
  searchFilter?: MemberSearchFilter
}

export const MemberListItem = ({ member, searchFilter }: MemberListItemProps) => {
  const balance = useBalance(member.controllerAccount)
  const { slashed, terminated } = useMemberRowWorkDetails(member)
  const showMemberModal = useShowMemberModal(member.id)

  return (
    <Wrapper>
      <MemberItemWrap kind={searchFilter ? 'MemberWithExternal' : 'Member'}>
        <MemberModalTrigger onClick={showMemberModal} />
        <MemberColumn>
          <Info>#{member.id}</Info>
        </MemberColumn>

        <MemberColumn>
          <MemberInfo member={member} hideGroup />
        </MemberColumn>

        <MemberColumn>
          <Info>{member.isCouncilMember ? <CheckboxIcon /> : <CrossIcon />}</Info>
        </MemberColumn>

        <MemberRolesColumn>
          <MemberRoles wrapable roles={member.roles} size="l" />
        </MemberRolesColumn>
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
      {searchFilter && searchFilter !== 'Membership' && (
        <ExternalInfo>
          {socialToIcon[searchFilter.toUpperCase() as Socials]}
          {searchFilter}
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
