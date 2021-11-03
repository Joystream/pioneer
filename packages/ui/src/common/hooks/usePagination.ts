import { useEffect, useState } from 'react'

export const usePagination = (perPage: number, totalCountPerPage: number, deps: unknown[]) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, deps)

  const pageCount = totalCountPerPage ? Math.ceil(totalCountPerPage / perPage) : 0
  const pagination = {
    pageCount: pageCount,
    handlePageChange: setPage,
    page,
  }

  return { offset: (page - 1) * perPage, pagination }
}
