import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors } from '../../constants'
import { ActivityCategory, ActivityType } from '../../types'
import { CopyIcon } from '../icons'
import { AppliedIcon } from '../icons/activities/AppliedIcon'
import { ClosedIcon } from '../icons/activities/ClosedIcon'
import { CreatedIcon } from '../icons/activities/CreatedIcon'
import { DecreasedIcon } from '../icons/activities/DecreasedIcon'
import { HiredIcon } from '../icons/activities/HiredIcon'
import { IncreasedIcon } from '../icons/activities/IncreasedIcon'
import { JoystreamIcon } from '../icons/activities/JoystreamIcon'
import { WarnedIcon } from '../icons/activities/WarnedIcon'

export interface ActivityIconProps {
  icon: ActivityCategory
  variant?: ActivityType
}

export const ActivityIcon = ({ icon }: ActivityIconProps) => {
  if (icon === 'closed') {
    return (
      <NegativeStyle>
        <ClosedIcon />
      </NegativeStyle>
    )
  }
  if (icon === 'hired') {
    return (
      <PositiveStyle>
        <HiredIcon />
      </PositiveStyle>
    )
  }
  if (icon === 'created') {
    return (
      <JoystreamStyle>
        <CreatedIcon />
      </JoystreamStyle>
    )
  }
  if (icon === 'increased') {
    return (
      <PositiveStyle>
        <IncreasedIcon />
      </PositiveStyle>
    )
  }
  if (icon === 'decreased') {
    return (
      <NegativeStyle>
        <DecreasedIcon />
      </NegativeStyle>
    )
  }
  if (icon === 'applied') {
    return (
      <JoystreamStyle>
        <AppliedIcon />
      </JoystreamStyle>
    )
  }
  if (icon === 'warned') {
    return (
      <NegativeStyle>
        <WarnedIcon />
      </NegativeStyle>
    )
  }
  if (icon === 'joystream') {
    return (
      <JoystreamStyle>
        <JoystreamIcon />
      </JoystreamStyle>
    )
  }

  return <CopyIcon />
}

const DefaulActivityIconStyle = styled.div`
  display: flex;
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
