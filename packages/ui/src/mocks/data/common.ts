import { isoDate } from '../helpers'

import { member } from './members'

const membership = member('eve')

export type BlockFieldsMock = {
  inBlock: number
  network: string
  createdAt: string
}

export const amount = '1666666666660000'

export const block = {
  createdAt: isoDate('01/02/2023'),
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
  createdAt: isoDate('01/02/2023'),
  group: workingGroup,
  membership,
}
