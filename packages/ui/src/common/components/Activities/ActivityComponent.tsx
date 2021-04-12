import React, { ReactNode } from 'react'

import { ActivityIcon, ActivityIconType, ActivityIconVariant } from './ActivityIcon'

export interface ActivityComponentProps {
  timestamp: string
  icon: ActivityIconType
  variant?: ActivityIconVariant
  children: ReactNode
}

export const ActivityComponent = ({ timestamp, icon, variant, children }: ActivityComponentProps) => (
  <div>
    <ActivityIcon icon={icon} variant={variant} />
    <div>{timestamp}</div>
    <div>{children}</div>
  </div>
)
