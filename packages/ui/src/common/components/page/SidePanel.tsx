import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, RemoveScrollbar } from '@/common/constants'

import { ActivityItem } from '../Activities/ActivityComponent'

interface SidePanelProps {
  scrollable?: boolean
  className?: string
  children?: React.ReactNode
}

export const SidePanel = ({ scrollable, className, children }: SidePanelProps) => (
  <SidePanelStyles scrollable={scrollable} className={className}>
    {children}
  </SidePanelStyles>
)

export const SidePanelStyles = styled.div<Pick<SidePanelProps, 'scrollable'>>`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ${({ scrollable }) =>
    scrollable &&
    css`
      max-height: 100%;
      overflow-y: scroll;
      ${RemoveScrollbar};
    `}

  &:after {
    content: '';
    height: 24px;
  }

  ${ActivityItem} {
    border-radius: ${BorderRad.s};
  }
`
