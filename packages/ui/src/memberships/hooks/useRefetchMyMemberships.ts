import { useEffect } from 'react'

import { useMyMemberships } from './useMyMemberships'

export const useRefetchMyMemberships = () => {
  const { refetch } = useMyMemberships()

  useEffect(() => {
    refetch?.()
  }, [])
}
