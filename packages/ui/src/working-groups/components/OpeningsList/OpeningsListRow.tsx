import React from 'react'

import { Toggle } from '@/common/components/buttons/Toggle'
import { Arrow } from '@/common/components/icons'
import { useToggle } from '@/common/hooks/useToggle'
import {
  OACItemContainer,
  OpeningToggleButton,
} from '@/working-groups/components/OpeningAndApplicationsComponents/OACStyledComponents'
import { isUpcomingOpening, UpcomingWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types'

import { Opening } from './Opening'
import { UpcomingOpening } from './UpcomingOpening'

export interface ListRowProps {
  opening: WorkingGroupOpening | UpcomingWorkingGroupOpening
}

export const OpeningsListRow = ({ opening }: ListRowProps) => {
  const [isOpened, toggleOpen] = useToggle()

  return (
    <Toggle absoluteToggle isOpen={isOpened}>
      <OACItemContainer isOpen={isOpened}>
        {isUpcomingOpening(opening) ? <UpcomingOpening opening={opening} /> : <Opening opening={opening} />}
      </OACItemContainer>
      <OpeningToggleButton absoluteToggle isOpen={isOpened} onClick={toggleOpen}>
        <Arrow direction="down" />
      </OpeningToggleButton>
    </Toggle>
  )
}
