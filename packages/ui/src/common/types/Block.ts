import * as Types from '@/common/api/queries'
import { isNumber } from '@/common/utils'

export type NetworkType = 'BABYLON' | 'ALEXANDRIA' | 'ROME' | 'GIZA' | 'OLYMPIA'

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

export const maybeAsBlock = (
  number?: number | null,
  dateTime?: string,
  network?: Types.Network | null
): Block | undefined => {
  if (isNumber(number) && dateTime && network) return asBlock({ inBlock: number, createdAt: dateTime, network })
}
