import React, { useState } from 'react'

import { Pagination } from '@/common/components/Pagination'
import { OpeningsList } from '@/working-groups/components/OpeningsList/OpeningsList'
import { useOpenings, UseOpeningsParams } from '@/working-groups/hooks/useOpenings'

type Props = Omit<UseOpeningsParams, 'page'>

export const OpeningsPagination = (props: Props) => {
  const [page, setPage] = useState(1)
  const { isLoading, openings, pageCount } = useOpenings({ ...props, page })
  return (
    <>
      <OpeningsList isLoading={isLoading} openings={openings} />
      <Pagination page={page} pageCount={pageCount} handlePageChange={setPage} />
    </>
  )
}
