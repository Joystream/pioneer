import { useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

export const useValidatorsList = () => {
  const { api } = useApi()
  const allValidators = useFirstObservableValue(() => api?.query.session.validators(), [api?.isConnected])
  const visibleValidators = useMemo(() => {
    return allValidators
  }, [allValidators])
  return {
    allValidators,
    visibleValidators,
  }
}
