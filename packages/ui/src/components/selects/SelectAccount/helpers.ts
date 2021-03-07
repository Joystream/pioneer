import { KeyringInstance } from '@polkadot/keyring/types'
import { KeyringStruct } from '@polkadot/ui-keyring/types'
import { Account, Address } from '../../../common/types'

export function filterByText(accounts: Account[], text: string) {
  return accounts.filter(
    (item) => item.name?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.address.includes(text)
  )
}

export function isValidAddress(address: Address, keyring: KeyringInstance | KeyringStruct) {
  try {
    keyring.encodeAddress(keyring.decodeAddress(address))
  } catch (e) {
    console.log(e)
    return false
  }
  return true
}
