import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '../../constants'
import { HelpComponent } from '../Help'

import { ControlProps } from '.'

interface TogglableIconProps extends ControlProps<boolean> {
  children: ReactNode
}
export const TogglableIcon = ({ children, value, onChange }: TogglableIconProps) => (
  <label onClick={() => onChange?.(!value)}>
    <DualStateIcon size="l" checked={value}>
      {children}
    </DualStateIcon>
  </label>
)

const DualStateIcon = styled(HelpComponent)`
  ${({ checked }: { checked?: boolean }) =>
    checked
      ? css`
          color: ${Colors.White};
          background: ${Colors.Black[800]};
        `
      : css`
          background: transparent;
        `}
`
