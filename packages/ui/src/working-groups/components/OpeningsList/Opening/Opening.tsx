import React from 'react'

import { WorkingGroupOpening } from '@/working-groups/types'

import { OpeningDetails } from './OpeningDetails'
import { OpeningListItem } from './OpeningListItem'

interface OpeningProps {
  opening: WorkingGroupOpening
  past?: boolean
}

export const Opening = ({ opening, past }: OpeningProps) => (
  <>
    <OpeningListItem opening={opening} past={past} />
    <OpeningDetails opening={opening} />
  </>
)
