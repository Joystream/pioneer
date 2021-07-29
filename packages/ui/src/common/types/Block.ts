import * as Types from '@/common/api/queries/__generated__/baseTypes.generated'

export type NetworkType = 'BABYLON' | 'ALEXANDRIA' | 'ROME' | 'OLYMPIA'

export interface Block {
  number: number
  network: NetworkType
  timestamp: string
}

export interface BlockFields {
  inBlock: number
  createdAt: string
  network: Types.Network
}

export const asBlock = (fields: BlockFields): Block => ({
  number: fields.inBlock,
  network: fields.network,
  timestamp: fields.createdAt,
})
