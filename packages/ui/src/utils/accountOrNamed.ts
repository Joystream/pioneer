import { Account, Address } from '../common/types'

export const accountOrNamed = (allAccounts: Account[], address: Address | string, name: string) => {
  const existing = allAccounts.find((account) => account.address === address)

  return existing ?? { address: address, name: name }
}
