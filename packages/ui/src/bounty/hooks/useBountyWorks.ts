import { useGetBountyWorksCountQuery, useGetBountyWorksQuery } from '@/bounty/queries'
import { asBountyWork } from '@/bounty/types/casts'
import { BountyEntryOrderByInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'

interface Props {
  bountyId: string
  perPage?: number
  workerHandle: string
}

export const useBountyWorks = ({ bountyId, perPage = 4, workerHandle }: Props) => {
  const { data: dataCount } = useGetBountyWorksCountQuery({
    variables: {
      where: {
        bounty: {
          id_eq: bountyId,
        },
      },
    },
  })

  const { offset, pagination } = usePagination(perPage, dataCount?.workSubmittedEventsConnection.totalCount ?? 0, [
    perPage,
  ])

  const { data, loading } = useGetBountyWorksQuery({
    variables: {
      offset,
      limit: perPage,
      order: BountyEntryOrderByInput.CreatedAtDesc,
      where: {
        worker: {
          handle_startsWith: workerHandle,
        },
        bounty: {
          id_eq: bountyId,
        },
      },
    },
  })

  return {
    isLoading: loading,
    works:
      data?.bountyEntries.map((entry) => entry.works?.map(asBountyWork(entry.worker, entry.status)) ?? []).flat() ?? [],
    pagination,
  }
}
