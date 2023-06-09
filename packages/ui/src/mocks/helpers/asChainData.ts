import { mapValues } from 'lodash'

import { asBN } from '@/common/utils'

export const asChainData = (data: any): any => {
  switch (Object.getPrototypeOf(data).constructor.name) {
    case 'Object':
      return mapValues(data, asChainData)

    case 'Array':
      return data.map(asChainData)

    case 'Number':
      return asBN(data)

    case 'String':
      return isNaN(data) ? data : asBN(data)

    default:
      return data
  }
}
