import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
export type ProposalFieldsFragment = { __typename: 'Proposal'; id: string }

export const ProposalFieldsFragmentDoc = gql`
  fragment ProposalFields on Proposal {
    id
  }
`
