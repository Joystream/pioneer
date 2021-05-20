import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors } from '../../constants'
import { ActivityCategory } from '../../types'
import { AppliedIcon } from '../icons/activities/AppliedIcon'
import { ClosedIcon } from '../icons/activities/ClosedIcon'
import { CreatedIcon } from '../icons/activities/CreatedIcon'
import { DecreasedIcon } from '../icons/activities/DecreasedIcon'
import { HiredIcon } from '../icons/activities/HiredIcon'
import { IncreasedIcon } from '../icons/activities/IncreasedIcon'
import { JoystreamIcon } from '../icons/activities/JoystreamIcon'
import { WarnedIcon } from '../icons/activities/WarnedIcon'

export interface ActivityIconProps {
  category: ActivityCategory
}

export const ActivityIcon = React.memo(({ category }: ActivityIconProps) => {
  switch (category) {
    case 'AppliedOnOpeningEvent':
      return (
        <JoystreamStyle>
          <AppliedIcon />
        </JoystreamStyle>
      )
    default:
      return (
        <JoystreamStyle>
          <JoystreamIcon />
        </JoystreamStyle>
      )
  }
})

const DefaulActivityIconStyle = styled.div`
  display: flex;
  grid-area: activityicon;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 12px;
  border-radius: ${BorderRad.round};
`

const NegativeStyle = styled(DefaulActivityIconStyle)`
  background-color: ${Colors.Red[50]};
  color: ${Colors.Red[200]};
  box-shadow: 0px 10px 28px ${Colors.Red[50] + 'CC'};
`

const PositiveStyle = styled(DefaulActivityIconStyle)`
  background-color: ${Colors.Green[50]};
  color: ${Colors.Green[500]};
  box-shadow: 0px 10px 28px ${Colors.Green[50] + 'CC'};
`

const JoystreamStyle = styled(DefaulActivityIconStyle)`
  background-color: ${Colors.Blue[50]};
  color: ${Colors.Blue[300]};
  box-shadow: 0px 10px 28px ${Colors.Blue[50] + 'CC'};
`
