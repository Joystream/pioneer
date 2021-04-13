import React, { ReactNode } from 'react'

import { relativeTime } from '../../model/relativeTime'
import { ActivityCategory, ActivityType } from '../../types'

import { ActivityIcon } from './ActivityIcon'

export interface ActivityComponentProps {
  timestamp: string
  category: ActivityCategory
  type?: ActivityType
  children: ReactNode
}

export const ActivityComponent = ({ timestamp, category, type, children }: ActivityComponentProps) => (
  <div>
    <ActivityIcon icon={category} variant={type} />
    <div>{relativeTime(timestamp)}</div>
    <div>{children}</div>
  </div>
)
