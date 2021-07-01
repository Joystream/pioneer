import { createType } from '@joystream/types'
import { TypeRegistry } from '@polkadot/types'
import BN from 'bn.js'

const typeRegistry = new TypeRegistry()

export const toBalanceOf = (balance: number) => typeRegistry.createType('BalanceOf', balance)

export const toRuntimeDispatchInfo = (fee: number) =>
  typeRegistry.createType('RuntimeDispatchInfo', {
    weight: 0,
    partialFee: fee,
  })

export const createBalance = (value: number) => {
  return createType('Balance', new BN(value))
}

export const getBalanceLock = (amount: number, type = 9) =>
  createType('BalanceLock', {
    id: createType('LockIdentifier', new Uint8Array(new Array(8).fill(type))),
    amount: createBalance(amount),
    reasons: createType('Reasons', 'all'),
  })
