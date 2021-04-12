import React, { ReactNode } from 'react'

import { ActivityCategory, ActivityType } from '../../types/Activity'

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
    <div>{timestamp}</div>
    <div>{children}</div>
  </div>
)
