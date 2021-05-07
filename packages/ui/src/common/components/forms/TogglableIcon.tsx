import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { MemberStatusTooltip } from '@/memberships/components/MemberTopTooltips'

import { Colors } from '../../constants'

import { ControlProps } from '.'

interface TogglableIconProps extends ControlProps<boolean> {
  children: ReactNode
}
export const TogglableIcon = ({ children, value, onChange }: TogglableIconProps) => (
  <label onClick={() => onChange?.(!value)}>
    <DualStateIcon checked={value}>{children}</DualStateIcon>
  </label>
)

const DualStateIcon = styled(MemberStatusTooltip)`
  width: 24px;
  height: 24px;
  ${({ checked }: { checked?: boolean }) =>
    checked
      ? css`
          color: ${Colors.White};
          border-color: ${Colors.Blue[500]};
          background-color: ${Colors.Blue[500]};

          &:hover,
          &:focus {
            color: ${Colors.Blue[500]};
            border-color: ${Colors.Blue[100]};
            background-color: ${Colors.Black[50]};
          }
        `
      : css`
          color: ${Colors.Black[900]};
          border-color: ${Colors.Black[200]};
          background-color: 'transparent';

          &:hover,
          &:focus {
            color: ${Colors.Blue[500]};
            border-color: ${Colors.Blue[100]};
            background-color: ${Colors.Black[50]};
          }
        `}
`
