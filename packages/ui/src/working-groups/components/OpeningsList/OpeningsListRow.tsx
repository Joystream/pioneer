import React from 'react'

import { Toggle } from '@/common/components/buttons/Toggle'
import { Arrow } from '@/common/components/icons'
import { useToggle } from '@/common/hooks/useToggle'
import {
  ToggleableItemContainer,
  OpeningToggleButton,
} from '@/working-groups/components/ToggleableItemStyledComponents'
import { isUpcomingOpening, UpcomingWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types'

import { Opening } from './Opening'
import { UpcomingOpening } from './UpcomingOpening'

export interface ListRowProps {
  opening: WorkingGroupOpening | UpcomingWorkingGroupOpening
  past?: boolean
}

export const OpeningsListRow = ({ opening, past }: ListRowProps) => {
  const [isOpened, toggleOpen] = useToggle()

  return (
    <Toggle absoluteToggle isOpen={isOpened}>
      <ToggleableItemContainer isOpen={isOpened}>
        {isUpcomingOpening(opening) ? <UpcomingOpening opening={opening} /> : <Opening opening={opening} past={past} />}
      </ToggleableItemContainer>
      <OpeningToggleButton absoluteToggle isOpen={isOpened} onClick={toggleOpen}>
        <Arrow direction="down" />
      </OpeningToggleButton>
    </Toggle>
  )
}
