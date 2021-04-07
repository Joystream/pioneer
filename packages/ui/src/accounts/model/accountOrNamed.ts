import { Address } from '../../common/types'
import { Account } from '../types'

export const accountOrNamed = (allAccounts: Account[], address: Address | string, name: string) => {
  const existing = allAccounts.find((account) => account.address === address)

  return existing ?? { address: address, name: name }
}
