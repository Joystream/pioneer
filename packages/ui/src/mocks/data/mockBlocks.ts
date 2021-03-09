import { BlockFieldsFragment, Network } from '../../api/queries'
import rawBlocks from './raw/blocks.json'

export type MockBlock = BlockFieldsFragment

export const mockBlocks: MockBlock[] = rawBlocks.map((rawBlock) => {
  return {
    ...rawBlock,
    network: Network.Babylon,
    __typename: 'Block',
  }
})
