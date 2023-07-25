import { createType } from '@joystream/types'
import { mapValues } from 'lodash'

import { isDefined } from '@/common/utils'

export const asChainData = (data: any): any => {
  const type = isDefined(data) ? Object.getPrototypeOf(data).constructor.name : typeof data
  switch (type) {
    case 'Object':
      return mapValues(data, asChainData)

    case 'Array':
      return data.map(asChainData)

    case 'Number':
      return createType('u128', data)

    case 'String':
      return isNaN(data) ? data : createType('u128', data)

    default:
      return data
  }
}
