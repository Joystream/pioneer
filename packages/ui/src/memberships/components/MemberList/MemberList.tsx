import React, { FC } from 'react'

import { List, ListItem } from '../../../common/components/List'
import { Member, Members } from '../../types'
import { MemberListItem } from '../MemberListItem/MemberListItem'

interface MembersSectionProps {
  members: Members
}

export const MemberList: FC<MembersSectionProps> = ({ members }) => (
  <List>
    {members.map((member: Member) => (
      <ListItem key={member.handle}>
        <MemberListItem member={member} />
      </ListItem>
    ))}
  </List>
)
