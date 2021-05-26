import React from 'react'

import { RouterLink } from '@/common/components/RouterLink'
import { OpeningAddedActivity } from '@/working-groups/types'

interface Props {
  activity: OpeningAddedActivity
}

export const OpeningAddedContent = ({ activity: { opening } }: Props) => (
  <>
    Opening "<RouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</RouterLink>" has been created by
    the Council.
  </>
)
