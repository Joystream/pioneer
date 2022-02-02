import { useGetSidebarInfoQuery } from '@/overview/queries/__generated__/overview.generated'
import { asOverviewSidebarInformation } from '@/overview/types/casts'

export const useOverviewSidebarInformation = (memberId: string) => {
  const { data, loading } = useGetSidebarInfoQuery({
    variables: {
      memberId,
    },
  })

  return {
    isLoading: loading,
    informations: data ? asOverviewSidebarInformation(data) : undefined,
  }
}
