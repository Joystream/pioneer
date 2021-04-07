import { Account } from '../../types'

export function filterByText(accounts: Account[], text: string) {
  return accounts.filter(
    (item) => item.name?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.address.includes(text)
  )
}
