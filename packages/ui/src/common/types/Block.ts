export type NetworkType = 'BABYLON' | 'ALEXANDRIA' | 'ROME' | 'OLYMPIA'

export interface Block {
  id: string
  number: number
  network: NetworkType
  timestamp: string
}

// See: https://github.com/Joystream/pioneer/issues/765
export const asBlock = (): Block => {
  return {
    id: '1337',
    network: 'OLYMPIA',
    number: 1337,
    timestamp: new Date().toJSON(),
  }
}
