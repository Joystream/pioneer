import React from 'react'
import { Link } from 'react-router-dom'

import { MemberModalLink } from '@/common/components/ModalLink'

import { AppliedOnOpeningActivity } from '../../types'

interface Props {
  activity: AppliedOnOpeningActivity
}

export const AppliedOnOpeningContent = ({ activity: { membership, opening } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: membership.id } }}>{membership.handle}</MemberModalLink> has
    applied on the opening <Link to={`/working-groups/openings/${opening.id}`}>{opening.title}</Link>.
  </>
)
