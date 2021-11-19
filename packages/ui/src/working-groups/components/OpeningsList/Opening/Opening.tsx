import React from 'react'

import { WorkingGroupOpening } from '@/working-groups/types'

import { OpeningDetails } from './OpeningDetails'
import { OpeningListItem } from './OpeningListItem'

interface OpeningProps {
  opening: WorkingGroupOpening
  past?: boolean
  onClick?: () => void
}

export const Opening = ({ opening, past, onClick }: OpeningProps) => (
  <>
    <OpeningListItem opening={opening} past={past} onClick={onClick} />
    <OpeningDetails opening={opening} past={past} onClick={onClick} />
  </>
)
