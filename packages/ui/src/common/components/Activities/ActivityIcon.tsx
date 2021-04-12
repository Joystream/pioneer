import React from 'react'

import { ArrowInsideIcon, CopyIcon } from '../icons'

export type ActivityIconType = 'up' | 'down'
export type ActivityIconVariant = 'error' | 'ok' | 'default'

export interface ActivityIconProps {
  icon: ActivityIconType
  variant?: ActivityIconVariant
}

export const ActivityIcon = ({ icon, variant }: ActivityIconProps) => {
  const type: ActivityIconVariant = variant ?? 'default'

  if (icon === 'up') {
    return <ArrowInsideIcon />
  }

  return <CopyIcon />
}
