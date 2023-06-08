import { alice } from './members'

export type BlockFieldsMock = {
  inBlock: number
  network: string
  createdAt: string
}

export const amount = '1666666666660000'

export const block = {
  createdAt: '2023-01-12T03:04:56.001Z',
  inBlock: 12345,
}

export const workingGroup = { __typename: 'WorkingGroup', id: '0', name: 'Operations Alpha' }
export const workingGroupOpening = {
  __typename: 'WorkingGroupOpening',
  id: '0',
  group: workingGroup,
  metadata: { __typename: 'WorkingGroupOpeningMetadata', description: 'Lorem ipsum...' },
}
export const worker = {
  __typename: 'Worker',
  createdAt: block.createdAt,
  group: workingGroup,
  membership: alice,
}
