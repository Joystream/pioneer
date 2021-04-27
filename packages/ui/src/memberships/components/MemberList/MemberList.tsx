import React, { FC } from 'react'

import { List, ListItem } from '../../../common/components/List'
import { ListHeader, ListHeaders } from '../../../common/components/List/ListHeader'
import { Member, MMember, Membership } from '../../types'
import { MemberListItem } from '../MemberListItem/MemberListItem'

type MembersSectionProps =
  | {
      type: 'Members'
      members: MMember[]
    }
  | {
      type: 'Membership'
      members: Membership[]
    }

export const colLayoutByType = (type: Member['type']) => {
  const id = 70
  const name = 194
  const concil = 80
  const roles = 200
  const count = type === 'Members' ? 20 : 76
  const total = 100

  return type === 'Members'
    ? `${id}px ${name}px ${concil}px ${roles}px ${count}px ${count}px ${total}px ${total}px`
    : `${name}px ${roles}px ${count}px ${count}px 96px 76px 54px`
}

export const MemberList: FC<MembersSectionProps> = ({ type, members }) => (
  <div>
    <ListHeaders colLayout={colLayoutByType(type)}>
      {type === 'Members' ? (
        <>
          <ListHeader>Member ID</ListHeader>
          <ListHeader>Member</ListHeader>
          <ListHeader>Concil Member</ListHeader>
          <ListHeader>Active Roles</ListHeader>
          <ListHeader>Slashed</ListHeader>
          <ListHeader>Terminated</ListHeader>
          <ListHeader>Total Balance</ListHeader>
          <ListHeader>Total Staked</ListHeader>
        </>
      ) : (
        <>
          <ListHeader>Memeberships</ListHeader>
          <ListHeader>Roles</ListHeader>
          <ListHeader>Slashed</ListHeader>
          <ListHeader>Terminated</ListHeader>
          <ListHeader>Invitations</ListHeader>
          <ListHeader>Invited</ListHeader>
        </>
      )}
    </ListHeaders>
    <List>
      {members.map((member: Member) => (
        <ListItem key={member.handle}>
          <MemberListItem member={member} />
        </ListItem>
      ))}
    </List>
  </div>
)
