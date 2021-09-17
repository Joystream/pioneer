import React from 'react'

import { OpeningsPagination } from '@/working-groups/components/OpeningsList'

export const OpeningsHistory = ({ groupId }: { groupId: string | undefined }) => (
  <OpeningsPagination groupId={groupId} type="past" />
)
