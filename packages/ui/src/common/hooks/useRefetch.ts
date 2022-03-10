import { useContext, useEffect, useState } from 'react'

import { RefetchContext, UseRefetch } from '../providers/refetch/context'

type Action = { type: 'set'; payload: UseRefetch[0] } | { type: 'do'; payload?: boolean }

export const useRefetch = (action: Action) => {
  const [refetch, setRefetch] = useContext(RefetchContext)
  const [refetching, setRefetching] = useState<Promise<any> | undefined>()

  useEffect(() => {
    switch (action.type) {
      case 'set':
        return setRefetch(action.payload)
      case 'do':
        if (action.payload) {
          setRefetching(refetch?.())
        }
        break
    }
  }, [action.type, action.payload])

  return refetching
}
