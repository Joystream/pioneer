import { Network } from '../../common/api/queries'
import { BlockFieldsFragment } from '../../common/queries'

import rawBlocks from './raw/blocks.json'

export type MockBlock = BlockFieldsFragment

export const mockBlocks: MockBlock[] = rawBlocks.map((rawBlock) => {
  return {
    ...rawBlock,
    network: Network.Olympia,
    __typename: 'Block',
  }
})

export const seedBlocks = (server: any) => {
  return mockBlocks.reduce((map, block) => {
    return map.set(block.id, server.schema.create('Block', { ...block }))
  }, new Map())
}
