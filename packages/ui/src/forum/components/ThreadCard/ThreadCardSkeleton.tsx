import React from 'react'
import styled from 'styled-components'

import { RowGapBlock } from '@/common/components/page/PageContent'
import { Skeleton } from '@/common/components/Skeleton'
import { BorderRad, Colors } from '@/common/constants'
import { repeat } from '@/common/utils'

export const ThreadCardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {repeat(
        () => (
          <Wrapper gap={10}>
            <Skeleton variant="circle" width="40px" height="40px" />
            <Skeleton variant="text" width="200px" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Wrapper>
        ),
        count
      )}
    </>
  )
}

const Wrapper = styled(RowGapBlock)`
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  padding: 24px;
`
