import { Network } from '../../common/api/queries'
import { BlockFieldsFragment } from '../../common/queries'

import rawBlocks from './raw/blocks.json'

export type MockBlock = Omit<BlockFieldsFragment, 'id'>

export const mockBlocks: MockBlock[] = rawBlocks.map((rawBlock) => {
  return {
    ...rawBlock,
    network: Network.Olympia,
    __typename: 'Block',
  }
})

export const seedBlocks = (server: any) => {
  for (const block of mockBlocks) {
    server.schema.create('Block', { ...block })
  }
}
