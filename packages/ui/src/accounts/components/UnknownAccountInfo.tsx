import React from 'react'

import { Address } from '../../common/types'
import { useMyAccounts } from '../hooks/useMyAccounts'
import { accountOrNamed } from '../model/accountOrNamed'

import { AccountInfo } from './AccountInfo'

interface Props {
  address: Address
  placeholderName: string
}

export const UnknownAccountInfo = React.memo(({ address, placeholderName }: Props) => {
  const { allAccounts } = useMyAccounts()
  const account = accountOrNamed(allAccounts, address, placeholderName)
  return <AccountInfo account={account} />
})
