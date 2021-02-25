import React from 'react'
import { Colors } from '../../constants/styles'
import { Icon } from './Icon'

interface MemberIconProps {
  memberCircle?: string
  memberInner?: string
}

export function VerifiedMemberIcon({ memberCircle, memberInner }: MemberIconProps) {
  return (
    <Icon size="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="none" color="currentColor">
      <circle cx="8" cy="8" r="7.5" stroke={memberCircle || Colors.Blue[50]} />
      <path
        d="M12.8889 5.30975L6.72039 11.6668L3.11112 8.44931L4.20173 7.39713L6.63848 9.56941L11.7191 4.3335L12.8889 5.30975Z"
        fill={memberInner || Colors.Blue[700]}
      />
    </Icon>
  )
}
