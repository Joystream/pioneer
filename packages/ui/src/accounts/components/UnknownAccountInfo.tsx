import React from 'react'

import { useAccounts } from '../hooks/useAccounts'
import { accountOrNamed } from '../model/accountOrNamed'

import { AccountInfo } from './AccountInfo'

interface Props {
  address: string
  placeholderName: string
}

export const UnknownAccountInfo = React.memo(({ address, placeholderName }: Props) => {
  const { allAccounts } = useAccounts()
  const account = accountOrNamed(allAccounts, address, placeholderName)
  return <AccountInfo account={account} />
})
