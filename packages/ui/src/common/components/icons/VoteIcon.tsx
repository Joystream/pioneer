import React from 'react'

import { Icon } from './Icon'

interface VoteIconProps {
  className?: any
}

export const VoteIcon = React.memo(({ className }: VoteIconProps) => (
  <Icon
    size="16"
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.67749 5.42773H7.32278L6.25612 6.4944H5.74416L4.67749 5.42773ZM3.7473 5.42773H2.44807H2.13615L1.98323 5.6996L0.799287 7.80439L0.689209 8.00008H0.666748V16.0001H11.3334V8.00008H11.3112L11.201 7.8043L10.0165 5.69951L9.8636 5.42773H9.55174H8.25298L7.18631 6.4944H9.23989L10.0872 8.00008H1.91305L2.75999 6.4944H4.81396L3.7473 5.42773ZM1.86675 9.20008H10.1334V14.8001H1.86675V9.20008Z" fill="black"/>
    <path d="M6.00001 6.75031L3.36902 4.11932L6.98663 0.501709L9.61762 3.1327L6.00001 6.75031Z" fill="#3F38FF"/>
  </Icon>
))
