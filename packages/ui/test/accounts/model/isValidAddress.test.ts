import { createTestKeyring } from '@polkadot/keyring/testing'

import { isValidAddress } from '@/accounts/model/isValidAddress'

import { bobStash } from '../../_mocks/keyring'

describe('isValidAddress', () => {
  const keyring = createTestKeyring()

  it('Valid: Correct address', () => {
    expect(isValidAddress(bobStash.address, keyring)).toBeTruthy()
  })

  it('Invalid: Too short', () => {
    const address = '5tyW46xGFne2UhjJM694Xgs5mUiveU4sbTyGBzmstUspZC9'
    expect(isValidAddress(address, keyring)).toBeFalsy()
  })

  it('Invalid: Too long', () => {
    const address = '5tyW46x1lGFne2UhjJM694Xgs5mUiveU4sbTyGBzmstUspZC9'
    expect(isValidAddress(address, keyring)).toBeFalsy()
  })

  it('Invalid: Illegal character', () => {
    const address = '5Hp!9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc'
    expect(isValidAddress(address, keyring)).toBeFalsy()
  })
})
