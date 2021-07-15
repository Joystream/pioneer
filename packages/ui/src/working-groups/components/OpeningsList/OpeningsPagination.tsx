import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { Pagination } from '@/common/components/Pagination'
import { TextBig } from '@/common/components/typography'
import { OpeningsList } from '@/working-groups/components/OpeningsList/OpeningsList'
import { UseOpeningsParams } from '@/working-groups/hooks/useOpenings'
import { useOpeningsPagination } from '@/working-groups/hooks/useOpeningsPagination'

type Props = UseOpeningsParams

export const OpeningsPagination = (props: Props) => {
  const [page, setPage] = useState(1)
  const { isLoading, openings, pageCount } = useOpeningsPagination({ ...props, page })

  if (isLoading) {
    return <Loading />
  }
  if (openings.length === 0) {
    return <TextBig>No openings found</TextBig>
  }

  return (
    <>
      <OpeningsList openings={openings} past={props.type === 'past' ?? false} />
      <Pagination page={page} pageCount={pageCount} handlePageChange={setPage} />
    </>
  )
}
