import { error } from '@/common/logger'
import { useMockDelay } from '@/mocks/hooks/useMockDelay'

import { seedProposals } from '../../mocks/data/seedProposals'

export const useProposals = () => {
  const { loading, data, error: err } = useMockDelay({ proposals: seedProposals })

  if (err) {
    error(err)
  }

  return {
    isLoading: loading,
    proposals: data?.proposals ?? [],
  }
}
