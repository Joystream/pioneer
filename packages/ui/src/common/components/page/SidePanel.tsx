import React from 'react'
import styled from 'styled-components'

import { BorderRad, RemoveScrollbar } from '@/common/constants'

import { ActivitiesList } from '../Activities'
import { ActivityItem } from '../Activities/ActivityComponent'

interface SidePanelProps {
  className?: string
  children?: React.ReactNode
}

export const SidePanel = ({ className, children }: SidePanelProps) => (
  <SidePanelStyles className={className}>{children}</SidePanelStyles>
)

export const SidePanelStyles = styled.div<{ neighborHeight?: number }>`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 280px;
  padding-left: 24px;
  overflow: hidden;
  overflow-y: scroll;
  ${RemoveScrollbar};

  &:after {
    content: '';
    height: 24px;
  }

  ${ActivitiesList} {
    margin: 0 -16px;
  }

  ${ActivityItem} {
    border-radius: ${BorderRad.s};
  }
`
