import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { Tooltip } from '@/common/components/Tooltip'

import { BorderRad, Colors } from '../../constants'

import { ControlProps } from '.'

interface TogglableIconProps extends ControlProps<boolean> {
  children: ReactNode
  tooltipText: string
}

export const TogglableIcon = ({ children, value, onChange, tooltipText }: TogglableIconProps) => (
  <Tooltip tooltipText={tooltipText}>
    <label onClick={() => onChange(!value)}>
      <DualStateIcon checked={value}>{children}</DualStateIcon>
    </label>
  </Tooltip>
)

const DualStateIcon = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.full};
  svg {
    width: 100%;
    height: 100%;
  }

  ${({ checked }: { checked?: boolean }) =>
    checked
      ? css`
          color: ${Colors.White};
          border-color: ${Colors.Blue[500]};
          background-color: ${Colors.Blue[500]};

          &:hover,
          &:focus {
            border-color: ${Colors.Blue[400]};
            background-color: ${Colors.Blue[400]};
          }
        `
      : css`
          color: ${Colors.Black[900]};
          border-color: ${Colors.Black[200]};
          background-color: transparent;

          &:hover,
          &:focus {
            color: ${Colors.Blue[500]};
            border-color: ${Colors.Blue[100]};
            background-color: ${Colors.Black[50]};
          }
        `}
`
