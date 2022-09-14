import React from 'react'

import { Loader } from '@/common/components/icons'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { OpeningsList } from '@/working-groups/components/OpeningsList/OpeningsList'
import { UpcomingWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types'

export interface LoadingOpeningsProps {
  isLoading: boolean
  openings: UpcomingWorkingGroupOpening[] | WorkingGroupOpening[]
}

export const LoadingOpenings = ({ isLoading, openings }: LoadingOpeningsProps) => {
  if (isLoading) {
    return <Loader />
  }

  if (!openings.length) {
    return <NotFoundText>No openings found</NotFoundText>
  }

  return <OpeningsList openings={openings} />
}
