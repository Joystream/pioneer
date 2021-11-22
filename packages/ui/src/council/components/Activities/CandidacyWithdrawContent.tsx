import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { CandidacyWithdrawActivity } from '@/council/types/CouncilActivities'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

export const CandidacyWithdrawContent: ActivityContentComponent<CandidacyWithdrawActivity> = ({ activity }) => (
  <>
    Council candidate
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.id } }}>
      {' '}
      {activity.candidateHandle}
    </MemberModalLink>{' '}
    has resigned.
  </>
)
