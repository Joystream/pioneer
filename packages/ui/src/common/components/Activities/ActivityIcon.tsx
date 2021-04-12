import React from 'react'

import { ArrowInsideIcon, CopyIcon } from '../icons'

export interface ActivityIconProps {
  iconName: 'up' | 'down'
  variant?: 'error' | 'ok' | 'default'
}

export const ActivityIcon = ({ iconName, variant }: ActivityIconProps) => {
  const type = variant ?? 'default'

  if (iconName === 'up') {
    return <ArrowInsideIcon />
  }

  return <CopyIcon />
}
