import React from 'react'
import styled, { css } from 'styled-components'

import { ActivityToIconMap } from '@/common/components/Activities/ActivityToIconMap'

import { BorderRad, Colors } from '../../constants'
import { ActivityCategory } from '../../types'

export type IconStyle = 'positive' | 'negative' | 'joystream'

export interface ActivityIconProps {
  category: ActivityCategory
}

export const ActivityIcon = React.memo(({ category }: ActivityIconProps) => {
  const [Icon, style] = ActivityToIconMap[category]
  return (
    <IconWrap iconStyle={style}>
      <Icon />
    </IconWrap>
  )
})

const IconWrap = styled.div<{ iconStyle: IconStyle }>`
  display: flex;
  grid-area: activityicon;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 12px;
  border-radius: ${BorderRad.round};

  ${({ iconStyle }) => {
    if (iconStyle === 'negative') {
      return NegativeStyle
    } else if (iconStyle === 'positive') {
      return PositiveStyle
    } else {
      return JoystreamStyle
    }
  }}
`

const NegativeStyle = css`
  background-color: ${Colors.Red[50]};
  color: ${Colors.Red[200]};
  box-shadow: 0 10px 28px ${Colors.Red[50] + 'CC'};
`

const PositiveStyle = css`
  background-color: ${Colors.Green[50]};
  color: ${Colors.Green[500]};
  box-shadow: 0 10px 28px ${Colors.Green[50] + 'CC'};
`

const JoystreamStyle = css`
  background-color: ${Colors.Blue[50]};
  color: ${Colors.Blue[300]};
  box-shadow: 0 10px 28px ${Colors.Blue[50] + 'CC'};
`
