import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors } from '../../constants'
import { ActivityCategory } from '../../types'
import { AppliedIcon } from '../icons/activities/AppliedIcon'
import { DecreasedIcon } from '../icons/activities/DecreasedIcon'
import { JoystreamIcon } from '../icons/activities/JoystreamIcon'

export interface ActivityIconProps {
  category: ActivityCategory
}

export const ActivityIcon = React.memo(({ category }: ActivityIconProps) => {
  switch (category) {
    case 'AppliedOnOpeningEvent':
      return (
        <IconStyle style="positive">
          <AppliedIcon />
        </IconStyle>
      )
    case 'BudgetSpendingEvent':
      return (
        <IconStyle style="negative">
          <DecreasedIcon />
        </IconStyle>
      )
    default:
      return (
        <IconStyle style="joystream">
          <JoystreamIcon />
        </IconStyle>
      )
  }
})

const IconStyle = styled.div<{ style: 'positive' | 'negative' | 'joystream' }>`
  display: flex;
  grid-area: activityicon;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 12px;
  border-radius: ${BorderRad.round};

  ${({ style }) => {
    if (style === 'negative') {
      return NegativeStyle
    } else if (style === 'positive') {
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
