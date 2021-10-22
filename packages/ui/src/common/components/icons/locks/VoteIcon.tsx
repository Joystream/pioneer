import React from 'react'

import { Colors } from '@/common/constants'

import { Icon } from '../Icon'

interface VoteIconProps {
  className?: string
}

export const VoteIcon = React.memo(({ className }: VoteIconProps) => (
  <Icon
    size="16"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0162 8.14148H13.9841L12.3841 9.74148H11.6162L10.0162 8.14148ZM8.62088 8.14148H6.67205H6.20417L5.97479 8.54927L4.19887 11.7065L4.03375 12H4.00006V24H20.0001V12H19.9667L19.8014 11.7063L18.0247 8.54914L17.7953 8.14148H17.3276H15.3794L13.7794 9.74148H16.8598L18.1307 12H5.86951L7.13993 9.74148H10.2209L8.62088 8.14148ZM5.80006 13.8H18.2001V22.2H5.80006V13.8Z"
      fill={Colors.Black[900]}
    />
    <path d="M12 10.1253L8.05347 6.17886L13.4799 0.752441L17.4264 4.69893L12 10.1253Z" fill={Colors.Blue[500]} />
  </Icon>
))
