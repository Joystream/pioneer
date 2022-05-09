import React from 'react'

import { ListItemLoader } from '@/common/components/ListItemLoader'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { Skeleton } from '@/common/components/Skeleton'

export const AccountItemLoading = React.memo(({ count }: { count: number }) => (
  <ListItemLoader id="accountItemLoading" columnsTemplate="276px repeat(4, 128px) 104px" count={count}>
    <ColumnGapBlock gap={15}>
      <Skeleton variant="circle" width="40px" height="40px" />
      <RowGapBlock gap={5}>
        <Skeleton variant="rect" width="100px" height="10px" />
        <Skeleton variant="rect" width="120px" height="10px" />
        <Skeleton variant="rect" width="140px" height="10px" />
      </RowGapBlock>
    </ColumnGapBlock>
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
  </ListItemLoader>
))
