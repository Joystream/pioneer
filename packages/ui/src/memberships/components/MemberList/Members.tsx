import React from 'react'

import { List, ListItem } from '../../../common/components/List'
import { ListHeader, ListHeaders } from '../../../common/components/List/ListHeader'
import { Member } from '../../types'
import { MemberListItem } from '../MemberListItem'
import { colLayoutByType } from '../MemberListItem/Fileds'

export const MemberList = ({ members }: { members: Member[] }) => (
  <div>
    <ListHeaders colLayout={colLayoutByType('Member')}>
      <ListHeader>Member ID</ListHeader>
      <ListHeader>Member</ListHeader>
      <ListHeader>Concil Member</ListHeader>
      <ListHeader>Active Roles</ListHeader>
      <ListHeader>Slashed</ListHeader>
      <ListHeader>Terminated</ListHeader>
      <ListHeader>Total Balance</ListHeader>
      <ListHeader>Total Staked</ListHeader>
    </ListHeaders>
    <List>
      {members.map((member) => (
        <ListItem key={member.handle}>
          <MemberListItem member={member} />
        </ListItem>
      ))}
    </List>
  </div>
)
