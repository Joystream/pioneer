import { error } from '@/common/logger'
import { mockPastProposals } from '@/mocks/data/mockProposals'
import { useMockDelay } from '@/mocks/hooks/useMockDelay'

export const usePastProposals = () => {
  const { loading, data, error: err } = useMockDelay({ proposals: mockPastProposals })

  if (err) {
    error(err)
  }

  return {
    isLoading: loading,
    proposals: data?.proposals ?? [],
  }
}
