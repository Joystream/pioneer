import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { CouncilRoutes } from '@/council/constants'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'
import { NewCandidateActivity } from '@/council/types/CouncilActivities'

export const NewCandidateContent: ActivityContentComponent<NewCandidateActivity> = ({ activity }) => {
  const { candidateId } = useCandidateIdByMember(activity.memberId)
  return (
    <ActivityRouterLink to={`${CouncilRoutes.currentElection}?candidate=${candidateId}`}>
      {activity.candidateHandle} has applied to council election.
    </ActivityRouterLink>
  )
}
