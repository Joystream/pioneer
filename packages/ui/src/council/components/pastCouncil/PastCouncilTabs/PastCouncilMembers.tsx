import React from 'react'

import { Loading } from '@/common/components/Loading'
import { usePastCouncilMembers } from '@/council/hooks/usePastCouncilMembers'

interface Props {
  councilId: string
}

export const PastCouncilMembers = ({ councilId }: Props) => {
  const { isLoading, councilMembers } = usePastCouncilMembers(councilId)

  console.log(councilMembers)

  if (isLoading) {
    return <Loading />
  }

  return <></>
}
