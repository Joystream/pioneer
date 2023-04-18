import { useEffect, useState } from 'react'
import { firstValueFrom } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'

import { encodeAddress } from '../model/encodeAddress'

interface Props {
  skip?: boolean
}

const cache: string[] = []

export const useVotingOptOutAccounts = ({ skip }: Props = {}): string[] => {
  const { api } = useApi()
  const [addresses, setAddresses] = useState<string[]>(cache)

  useEffect(() => {
    if (skip || !api || cache.length) return

    firstValueFrom(api.query.referendum.accountsOptedOut.keys()).then((result: any) => {
      setAddresses(result.map((key: any) => encodeAddress(key.args[0])))
    })
  }, [api?.isConnected])

  return addresses
}
