import React from 'react'

import { ActivityCategory, ActivityType } from '../../types'
import { ArrowInsideIcon, CopyIcon } from '../icons'

export interface ActivityIconProps {
  icon: ActivityCategory
  variant?: ActivityType
}

export const ActivityIcon = ({ icon }: ActivityIconProps) => {
  if (icon === 'closed') {
    return <ArrowInsideIcon />
  }

  return <CopyIcon />
}
