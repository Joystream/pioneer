import React from 'react'

import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeSlashedActivity } from '@/working-groups/types'

interface Props {
  activity: StakeSlashedActivity
}

export const StakeSlashedContent = ({ activity: { member, groupName } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has been
    slashed by the {groupName} Working Group Lead.
  </>
)
