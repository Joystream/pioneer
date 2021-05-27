import React from 'react'

import { Toggle } from '@/common/components/buttons/Toggle'
import { Arrow } from '@/common/components/icons'
import { useToggle } from '@/common/hooks/useToggle'
import {
  OACItemContainer,
  OpeningToggleButton,
} from '@/working-groups/components/OpeningAndApplicationsComponents/OACStyledComponents'
import { OpeningDetails } from '@/working-groups/components/OpeningsList/OpeningDetails'
import { OpeningListItem } from '@/working-groups/components/OpeningsList/OpeningListItem'
import { UpcomingOpeningDetails } from '@/working-groups/components/OpeningsList/UpcomingOpeningDetails'
import { UpcomingOpeningListItem } from '@/working-groups/components/OpeningsList/UpcomingOpeningListItem'
import { isUpcomingOpening, UpcomingWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types'

export interface ListRowProps {
  opening: UpcomingWorkingGroupOpening | WorkingGroupOpening
}

export const OpeningsListRow = ({ opening }: ListRowProps) => {
  const [isOpened, toggleOpen] = useToggle()

  return (
    <Toggle absoluteToggle isOpen={isOpened}>
      <OACItemContainer isOpen={isOpened}>
        {isUpcomingOpening(opening) ? (
          <>
            <UpcomingOpeningListItem opening={opening} />
            <UpcomingOpeningDetails opening={opening} />
          </>
        ) : (
          <>
            <OpeningListItem opening={opening} />
            <OpeningDetails opening={opening} />
          </>
        )}
      </OACItemContainer>
      <OpeningToggleButton absoluteToggle isOpen={isOpened} onClick={toggleOpen}>
        <Arrow direction="down" />
      </OpeningToggleButton>
    </Toggle>
  )
}
