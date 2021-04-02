import { TypeRegistry } from '@polkadot/types'

const typeRegistry = new TypeRegistry()

export const toBalanceOf = (balance: number) => typeRegistry.createType('BalanceOf', balance)
export const toRuntimeDispatchInfo = (fee: number) =>
  typeRegistry.createType('RuntimeDispatchInfo', {
    weight: 0,
    partialFee: fee,
  })
