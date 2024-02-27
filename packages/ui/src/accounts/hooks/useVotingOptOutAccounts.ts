import { useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

import { encodeAddress } from '../model/encodeAddress'

interface Props {
  skip?: boolean
}

export const useVotingOptOutAccounts = ({ skip }: Props = {}) => {
  const { api } = useApi()
  const accountsOptedOut = useFirstObservableValue(() => {
    return skip ? undefined : api?.query.referendum?.accountsOptedOut.keys()
  }, [api?.isConnected])
  return useMemo(() => accountsOptedOut?.map((key) => encodeAddress(key.args[0])), [accountsOptedOut])
}
