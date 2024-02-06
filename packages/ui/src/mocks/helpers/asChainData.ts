import { createType } from '@joystream/types'
import { mapValues } from 'lodash'

import { encodeAddress } from '@/accounts/model/encodeAddress'

export const asChainData = (data: any): any => {
  switch (Object.getPrototypeOf(data).constructor.name) {
    case 'Object':
      return withUnwrap(mapValues(data, asChainData))

    case 'Array':
      return data.map(asChainData)

    case 'Number':
      return createType('u128', data)

    case 'String':
      return isNaN(data) ? data : createType('u128', data)

    case 'Boolean':
      return createType('bool', data)

    default:
      return data
  }
}

const withUnwrap = (data: Record<any, any>) =>
  Object.defineProperties(data, {
    unwrap: { value: () => data },
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
