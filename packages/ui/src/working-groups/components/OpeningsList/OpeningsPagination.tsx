import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { Pagination } from '@/common/components/Pagination'
import { TextBig } from '@/common/components/typography'
import { OpeningsList } from '@/working-groups/components/OpeningsList/OpeningsList'
import { useOpenings, UseOpeningsParams } from '@/working-groups/hooks/useOpenings'

type Props = Omit<UseOpeningsParams, 'page'>

export const OpeningsPagination = (props: Props) => {
  const [page, setPage] = useState(1)
  const { isLoading, openings, pageCount } = useOpenings({ ...props, page })

  if (isLoading) return <Loading />
  if (openings.length === 0) return <TextBig>No openings found</TextBig>

  return (
    <>
      <OpeningsList openings={openings} />
      <Pagination page={page} pageCount={pageCount} handlePageChange={setPage} />
    </>
  )
}
