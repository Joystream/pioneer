import { useEffect, useMemo, useState } from 'react'
import { useApi } from '@/api/hooks/useApi'
import { map } from 'rxjs'
import { BN } from '@polkadot/util'

import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'

export const useValidatorsList = () => {
  const { api } = useApi()
  const allValidators = useFirstObservableValue(() => api?.query.session.validators(), [api?.isConnected])
  const visibleValidators = useMemo(
    ()=>{
      return allValidators
    }
  ,[allValidators])
  return {
    allValidators,
    visibleValidators,

  }
}
