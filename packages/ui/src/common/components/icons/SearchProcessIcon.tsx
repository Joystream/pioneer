import React from 'react'

import Animated from '@/app/assets/AnimatedIcons/SearchingProcess.svg'

import { IconDecorativeCircle, IconWrapper } from './IconWrapper'

export const SearchProcessIcon = React.memo(({ className }: { className?: string }) => (
  <IconWrapper size="100" className={className}>
    <IconDecorativeCircle size="108" />
    <object type="image/svg+xml" data={Animated}>
      svg-animation
    </object>
  </IconWrapper>
))
