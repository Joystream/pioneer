import { error } from '@/common/logger'
import { mockProposals } from '@/mocks/data/mockProposals'
import { useMockDelay } from '@/mocks/hooks/useMockDelay'

import { Proposal } from '../types'

const mock: { [k: string]: { proposals: Proposal[] } } = {
  current: { proposals: mockProposals },
  past: { proposals: [] },
}

interface Props {
  type: 'current' | 'past'
}

export const useProposals = ({ type }: Props) => {
  const { loading, data, error: err } = useMockDelay(mock[type])

  if (err) {
    error(err)
  }

  return {
    isLoading: loading,
    proposals: data?.proposals ?? [],
  }
}
