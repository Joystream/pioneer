import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ButtonLink } from '@/common/components/buttons/Buttons'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeSlashedActivity } from '@/working-groups/types'

export const StakeSlashedContent: ActivityContentComponent<StakeSlashedActivity> = ({ activity, isOwn }) => {
  const { member, groupName } = activity

  if (isOwn) {
    return <>Your stake was reduced by the {groupName} Working Group Lead.</>
  }

  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has been
      reduced by the {groupName} Working Group Lead.{' '}
      <ButtonLink size="small" inline>
        Read more
      </ButtonLink>
    </>
  )
}
