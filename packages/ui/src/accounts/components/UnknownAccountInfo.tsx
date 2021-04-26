import React, { useMemo } from 'react'

import { useAccounts } from '../hooks/useAccounts'

import { AccountInfo } from './AccountInfo'

interface Props {
  address: string
  placeholderName: string
}

export const UnknownAccountInfo = React.memo(({ address, placeholderName }: Props) => {
  const { allAccounts } = useAccounts()
  const account = useMemo(
    () => allAccounts.find((acc) => acc.address == address) ?? { address, name: placeholderName },
    [allAccounts, address, placeholderName]
  )
  return <AccountInfo account={account} />
})
