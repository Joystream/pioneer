import { BlockFieldsFragment } from '../queries'

export type NetworkType = 'BABYLON' | 'ALEXANDRIA' | 'ROME' | 'OLYMPIA'

export interface Block {
  id: string
  number: number
  network: NetworkType
}

export const asBlock = (block: BlockFieldsFragment): Block => {
  return {
    ...block,
  }
}
