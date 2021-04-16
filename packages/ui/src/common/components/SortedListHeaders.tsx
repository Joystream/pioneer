import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../constants'

import { Arrow, Icon } from './icons'

export function SortIconDown() {
  return (
    <IconDown>
      <Arrow direction="down" />
    </IconDown>
  )
}

export function SortIconUp() {
  return (
    <IconUp>
      <Arrow direction="down" />
    </IconUp>
  )
}
export const HeaderText = styled.span`
  display: inline-flex;
  position: relative;
  align-items: center;
  width: fit-content;
`

const IconDown = styled.span`
  display: inline-flex;
  position: absolute;
  left: calc(100% + 4px);
  width: fit-content;
  height: fit-content;
  transition: ${Transitions.all};

  ${Icon.type} {
    width: 12px;
    height: 12px;
    color: ${Colors.Black[600]};
    animation: sortArrowFlip ${Transitions.duration} ease;

    @keyframes sortArrowFlip {
      from {
        opacity: 0;
        transform: scaleY(-1);
      }
      to {
        opacity: 1;
        transform: scaleY(1);
      }
    }
  }
`

const IconUp = styled(IconDown)`
  transform: rotate(180deg);
`
