import { mockProposals } from '@/mocks/data/mockProposals'
import { useMockDelay } from '@/mocks/hooks/useMockDelay'

import { Proposal } from '../types'

const mock: { [k: string]: { proposals: Proposal[] } } = {
  current: { proposals: mockProposals },
  past: { proposals: [] },
}

export const useProposals = ({ type }: { type: 'current' | 'past' }) => {
  const { loading, data, error } = useMockDelay(mock[type])

  if (error) {
    console.error(error)
  }

  return {
    isLoading: loading,
    proposals: data?.proposals ?? [],
  }
}
