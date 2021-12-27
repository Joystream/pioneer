import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type BountyFieldsFragment = {
  __typename: 'Bounty'
  id: string
  title: string
  description: string
  cherry: any
  entrantStake: any
  creatorId?: string | null | undefined
  oracleId?: string | null | undefined
  workPeriod: number
  judgingPeriod: number
  stage: Types.BountyStage
  totalFunding: any
  fundingType: { __typename: 'BountyFundingLimited' } | { __typename: 'BountyFundingPerpetual' }
  contractType:
    | {
        __typename: 'BountyContractClosed'
        whitelist?: Array<{ __typename: 'Membership'; id: string }> | null | undefined
      }
    | { __typename: 'BountyContractOpen' }
  bountycontributionbounty?:
    | Array<{ __typename: 'BountyContribution'; contributorId?: string | null | undefined }>
    | null
    | undefined
  bountyentrybounty?:
    | Array<{ __typename: 'BountyEntry'; workerId: string; works: Array<{ __typename: 'BountyWorkData'; id: string }> }>
    | null
    | undefined
}

export type GetBountyQueryVariables = Types.Exact<{
  where: Types.BountyWhereUniqueInput
}>

export type GetBountyQuery = {
  __typename: 'Query'
  bountyByUniqueInput?:
    | {
        __typename: 'Bounty'
        id: string
        title: string
        description: string
        cherry: any
        entrantStake: any
        creatorId?: string | null | undefined
        oracleId?: string | null | undefined
        workPeriod: number
        judgingPeriod: number
        stage: Types.BountyStage
        totalFunding: any
        fundingType: { __typename: 'BountyFundingLimited' } | { __typename: 'BountyFundingPerpetual' }
        contractType:
          | {
              __typename: 'BountyContractClosed'
              whitelist?: Array<{ __typename: 'Membership'; id: string }> | null | undefined
            }
          | { __typename: 'BountyContractOpen' }
        bountycontributionbounty?:
          | Array<{ __typename: 'BountyContribution'; contributorId?: string | null | undefined }>
          | null
          | undefined
        bountyentrybounty?:
          | Array<{
              __typename: 'BountyEntry'
              workerId: string
              works: Array<{ __typename: 'BountyWorkData'; id: string }>
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export const BountyFieldsFragmentDoc = gql`
  fragment BountyFields on Bounty {
    id
    title
    description
    cherry
    entrantStake
    creatorId
    oracleId
    fundingType {
      __typename
    }
    contractType {
      __typename
      ... on BountyContractClosed {
        whitelist {
          id
        }
      }
    }
    workPeriod
    judgingPeriod
    stage
    totalFunding
    bountycontributionbounty {
      contributorId
    }
    bountyentrybounty {
      workerId
      works {
        id
      }
    }
  }
`
export const GetBountyDocument = gql`
  query GetBounty($where: BountyWhereUniqueInput!) {
    bountyByUniqueInput(where: $where) {
      ...BountyFields
    }
  }
  ${BountyFieldsFragmentDoc}
`

/**
 * __useGetBountyQuery__
 *
 * To run a query within a React component, call `useGetBountyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountyQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBountyQuery(baseOptions: Apollo.QueryHookOptions<GetBountyQuery, GetBountyQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountyQuery, GetBountyQueryVariables>(GetBountyDocument, options)
}
export function useGetBountyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountyQuery, GetBountyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountyQuery, GetBountyQueryVariables>(GetBountyDocument, options)
}
export type GetBountyQueryHookResult = ReturnType<typeof useGetBountyQuery>
export type GetBountyLazyQueryHookResult = ReturnType<typeof useGetBountyLazyQuery>
export type GetBountyQueryResult = Apollo.QueryResult<GetBountyQuery, GetBountyQueryVariables>
