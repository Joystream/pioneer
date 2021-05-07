import React from 'react'
import styled, { css } from 'styled-components'

import { VerifiedMemberIcon, FounderMemberIcon } from '@/common/components/icons'
import { DefaultTooltip } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'

interface MemberStatusTooltipProps {
  isOnDark?: boolean
  className?: string
  size?: 'l' | 'm'
}

export const VerifiedMemberTooltip = ({ isOnDark, className, size }: MemberStatusTooltipProps) => {
  return (
    <MemberStatusTooltip isOnDark={isOnDark} className={className} size={size}>
      <VerifiedMemberIcon />
    </MemberStatusTooltip>
  )
}

export const FounderMemberTooltip = ({ isOnDark, className, size }: MemberStatusTooltipProps) => {
  return (
    <MemberStatusTooltip isOnDark={isOnDark} className={className} size={size}>
      <FounderMemberIcon />
    </MemberStatusTooltip>
  )
}

export const MemberStatusTooltip = styled(DefaultTooltip)<MemberStatusTooltipProps>`
  ${({ size }) =>
    size === 'l'
      ? css`
          width: 24px;
          height: 24px;
        `
      : css`
          width: 16px;
          height: 16px;
        `};
  ${({ isOnDark }) =>
    isOnDark
      ? css`
          border-color: ${Colors.Blue[500]};
          color: ${Colors.Blue[500]};
          background-color: transparent;

          &:hover,
          &:focus {
            border-color: ${Colors.Blue[400]};
            color: ${Colors.Blue[400]};
            background-color: transparent;
          }
        `
      : css`
          border-color: ${Colors.Black[200]};
          color: ${Colors.Black[900]};

          &:hover,
          &:focus {
            border-color: ${Colors.Blue[100]};
            color: ${Colors.Blue[500]};
            background-color: ${Colors.Black[50]};
          }
        `};
`
