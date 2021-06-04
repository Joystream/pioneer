import React from 'react'

import { WorkingGroupOpening } from '@/working-groups/types'

import { OpeningDetails } from './OpeningDetails'
import { OpeningListItem } from './OpeningListItem'

export const Opening = (props: { opening: WorkingGroupOpening }) => (
  <>
    <OpeningListItem opening={props.opening} />
    <OpeningDetails opening={props.opening} />
  </>
)
