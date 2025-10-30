import React from 'react'

import { ListItemLoader } from '@/common/components/ListItemLoader'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { Skeleton } from '@/common/components/Skeleton'

export const ValidatorItemLoading = React.memo(({ count }: { count: number }) => (
  <ListItemLoader
    columnsTemplate="250px 110px 80px 140px 140px 140px 100px 90px"
    gap="8px"
    padding="16px"
    count={count}
  >
    <ColumnGapBlock gap={15}>
      <Skeleton variant="circle" width="40px" height="40px" />
      <RowGapBlock gap={8}>
        <Skeleton variant="rect" width="100px" height="16px" />
        <Skeleton variant="rect" width="170px" height="16px" />
      </RowGapBlock>
    </ColumnGapBlock>
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
  </ListItemLoader>
))
