import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { NotEnoughCandidatesActivity } from '@/council/types/CouncilActivities'

export const NotEnoughCandidatesContent: ActivityContentComponent<NotEnoughCandidatesActivity> = () => (
  <>There has been not enough candidates during announcing period.</>
)
