import { useGetBountyWorksQuery } from '@/bounty/queries'
import { asBountyWork } from '@/bounty/types/casts'

interface Props {
  bountyId: string
  workerHandleStartsWith: string
}

export const useBountyWorks = ({ bountyId, workerHandleStartsWith }: Props) => {
  const { data, loading } = useGetBountyWorksQuery({
    variables: {
      where: {
        entry: {
          bounty: {
            id_eq: bountyId,
          },
          worker: {
            handle_startsWith: workerHandleStartsWith,
          },
        },
      },
    },
  })

  return {
    isLoading: loading,
    works: data?.bountyWorkData ? data.bountyWorkData.map(asBountyWork) : [],
  }
}
