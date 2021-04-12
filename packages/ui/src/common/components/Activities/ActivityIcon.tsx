import React from 'react'

import { ActivityCategory, ActivityType } from '../../types/Activity'
import { ArrowInsideIcon, CopyIcon } from '../icons'

export interface ActivityIconProps {
  icon: ActivityCategory
  variant?: ActivityType
}

export const ActivityIcon = ({ icon, variant }: ActivityIconProps) => {
  const type: ActivityType = variant ?? 'default'

  if (icon === 'closed') {
    return <ArrowInsideIcon />
  }

  return <CopyIcon />
}
