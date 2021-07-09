import React from 'react'

import { WorkerRewardAccountUpdatedEvent } from '@/common/api/queries'
import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'

export const WorkerRewardAccountUpdatedContent: ActivityContentComponent<WorkerRewardAccountUpdatedEvent> = () => {
  return <>Your reward account has been updated.</>
}
