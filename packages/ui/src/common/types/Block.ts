import * as Types from '@/common/api/queries/__generated__/baseTypes.generated'

export type NetworkType = 'BABYLON' | 'ALEXANDRIA' | 'ROME' | 'OLYMPIA'

export interface Block {
  id?: string
  number: number
  network: NetworkType
  timestamp: string
}

export interface BlockFields {
  inBlock: number
  createdAt: any
  network: Types.Network
}

export const asBlock = (blockData: BlockFields): Block => {
  if (!blockData) {
    return {
      id: '1337',
      network: 'OLYMPIA',
      number: 1337,
      timestamp: new Date().toJSON(),
    }
  }

  return {
    id: '',
    number: blockData.inBlock,
    network: blockData.network,
    timestamp: blockData.createdAt,
  }
}
