import React from 'react'

export interface FillWorkingGroupLeadOpeningParameters {
  groupId?: string
  openingId?: string
  applicationId?: string
}

interface Props {
  groupId?: string
  setGroupId: (groupId: string) => void
  openingId?: string
  setOpenedId: (openingId: string) => void
  applicationId?: string
  setApplicationId: (applicationId: string) => void
}

export const FillWorkingGroupLeadOpening = ({
  groupId,
  openingId,
  setGroupId,
  setOpenedId,
  applicationId,
  setApplicationId,
}: Props) => {
  return <div>FillWorkingGroupLeadOpening</div>
}
