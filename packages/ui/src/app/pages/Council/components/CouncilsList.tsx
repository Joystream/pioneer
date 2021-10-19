import React from 'react'

import { Loading } from '@/common/components/Loading'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { Council } from '@/council/types'

interface Props {
  isLoading: boolean
  councils?: Council[]
}

export const CouncilsList = ({ councils, isLoading }: Props) => {
  if (isLoading) {
    return <Loading />
  }

  if (!councils?.length) {
    return <NotFoundText>There are no past councils</NotFoundText>
  }

  return <>{councils.map(() => 'foo')}</>
}
