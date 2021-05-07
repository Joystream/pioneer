import React from 'react'
import styled, { css } from 'styled-components'

import { VerifiedMemberIcon, FounderMemberIcon } from '@/common/components/icons'
import { DefaultTooltip } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'

interface MemberStatusTooltipProps {
  isOnDark?: boolean
}

export const VerifiedMemberTooltip = ({ isOnDark }: MemberStatusTooltipProps) => {
  return (
    <MemberStatusTooltip isOnDark={isOnDark}>
      <VerifiedMemberIcon />
    </MemberStatusTooltip>
  )
}

export const FounderMemberTooltip = ({ isOnDark }: MemberStatusTooltipProps) => {
  return (
    <MemberStatusTooltip isOnDark={isOnDark}>
      <FounderMemberIcon />
    </MemberStatusTooltip>
  )
}

const MemberStatusTooltip = styled(DefaultTooltip)<MemberStatusTooltipProps>`
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
