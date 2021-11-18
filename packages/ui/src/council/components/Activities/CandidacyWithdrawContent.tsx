import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { CandidacyWithdrawActivity } from '@/council/types/CouncilActivities'

export const CandidacyWithdrawContent: ActivityContentComponent<CandidacyWithdrawActivity> = ({ activity }) => (
  <>Council candidate {activity.candidateHandle} has resigned.</>
)
