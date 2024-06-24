import { createType } from '@joystream/types'
import { isAddress } from '@polkadot/util-crypto'
import { mapValues } from 'lodash'

import { encodeAddress } from '@/accounts/model/encodeAddress'

const mockApiMethods = (mapFn: (data: any) => any) => (_data: any) => {
  const data = mapFn(_data)
  if (!data || typeof data !== 'object') return data

  try {
    return Object.defineProperties(data, {
      unwrap: { value: () => data },
      unwrapOr: { value: () => data },
      toJSON: { value: () => data },
      isSome: { value: Object.keys(data).length > 0 },
      get: {
        value: (key: any) => {
          if (key.toRawType?.() === 'AccountId') {
            return data[encodeAddress(key.toString())]
          }
          return data[key.toString()]
        },
      },
    })
  } catch {
    return data
  }
}

export const asChainData = mockApiMethods((data: any): any => {
  switch (Object.getPrototypeOf(data).constructor.name) {
    case 'Object':
      return mapValues(data, asChainData)

    case 'Array':
      return data.map(asChainData)

    case 'Number':
      return createType('u128', data)

    case 'String':
      if (!isNaN(data)) return createType('u128', data)
      if (isAddress(data)) return createType('AccountId', data)
      return createType('Text', data)

    case 'Boolean':
      return createType('bool', data)

    default:
      return data
  }
})
