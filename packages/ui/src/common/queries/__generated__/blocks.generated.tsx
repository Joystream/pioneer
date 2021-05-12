import * as Types from '../../api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
export type BlockFieldsFragment = {
  __typename: 'Block'
  id: string
  number: number
  timestamp: any
  network: Types.Network
  createdAt: any
}

export const BlockFieldsFragmentDoc = gql`
  fragment BlockFields on Block {
    id
    number
    timestamp
    network
    createdAt
  }
`
