import { useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

import { encodeAddress } from '../model/encodeAddress'

export const useVotingOptOutAccounts = () => {
  const { api } = useApi()
  const accountsOptedOut = useFirstObservableValue(() => {
    return api?.query.referendum.accountsOptedOut.keys()
  }, [api?.isConnected])
  return useMemo(() => accountsOptedOut?.map((key) => encodeAddress(key.args[0])), [accountsOptedOut])
}
