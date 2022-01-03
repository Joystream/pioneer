import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import { MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type BountyFieldsFragment = {
  __typename: 'Bounty'
  id: string
  createdAt: any
  title: string
  cherry: any
  entrantStake: any
  workPeriod: number
  judgingPeriod: number
  stage: Types.BountyStage
  totalFunding: any
  creator?:
    | {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null | undefined
          about?: string | null | undefined
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null | undefined
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
      }
    | null
    | undefined
  oracle?:
    | {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null | undefined
          about?: string | null | undefined
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null | undefined
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
      }
    | null
    | undefined
  fundingType:
    | { __typename: 'BountyFundingLimited'; minFundingAmount: number; maxFundingAmount: number; fundingPeriod: number }
    | { __typename: 'BountyFundingPerpetual'; target: number }
  entries: Array<{
    __typename: 'BountyEntry'
    worker: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null | undefined
        about?: string | null | undefined
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null | undefined
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
    }
    status:
      | { __typename: 'BountyEntryStatusCashedOut' }
      | { __typename: 'BountyEntryStatusPassed' }
      | { __typename: 'BountyEntryStatusRejected' }
      | { __typename: 'BountyEntryStatusWinner'; reward: number }
      | { __typename: 'BountyEntryStatusWithdrawn' }
      | { __typename: 'BountyEntryStatusWorking' }
  }>
  createdInEvent: { __typename: 'BountyCreatedEvent'; inBlock: number }
}

export type GetBountiesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BountyWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.BountyOrderByInput> | Types.BountyOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetBountiesQuery = {
  __typename: 'Query'
  bounties: Array<{
    __typename: 'Bounty'
    id: string
    createdAt: any
    title: string
    cherry: any
    entrantStake: any
    workPeriod: number
    judgingPeriod: number
    stage: Types.BountyStage
    totalFunding: any
    creator?:
      | {
          __typename: 'Membership'
          id: string
          rootAccount: string
          controllerAccount: string
          boundAccounts: Array<string>
          handle: string
          isVerified: boolean
          isFoundingMember: boolean
          inviteCount: number
          createdAt: any
          metadata: {
            __typename: 'MemberMetadata'
            name?: string | null | undefined
            about?: string | null | undefined
            avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null | undefined
          }
          roles: Array<{
            __typename: 'Worker'
            id: string
            createdAt: any
            isLead: boolean
            group: { __typename: 'WorkingGroup'; name: string }
          }>
        }
      | null
      | undefined
    oracle?:
      | {
          __typename: 'Membership'
          id: string
          rootAccount: string
          controllerAccount: string
          boundAccounts: Array<string>
          handle: string
          isVerified: boolean
          isFoundingMember: boolean
          inviteCount: number
          createdAt: any
          metadata: {
            __typename: 'MemberMetadata'
            name?: string | null | undefined
            about?: string | null | undefined
            avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null | undefined
          }
          roles: Array<{
            __typename: 'Worker'
            id: string
            createdAt: any
            isLead: boolean
            group: { __typename: 'WorkingGroup'; name: string }
          }>
        }
      | null
      | undefined
    fundingType:
      | {
          __typename: 'BountyFundingLimited'
          minFundingAmount: number
          maxFundingAmount: number
          fundingPeriod: number
        }
      | { __typename: 'BountyFundingPerpetual'; target: number }
    entries: Array<{
      __typename: 'BountyEntry'
      worker: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null | undefined
          about?: string | null | undefined
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null | undefined
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
      }
      status:
        | { __typename: 'BountyEntryStatusCashedOut' }
        | { __typename: 'BountyEntryStatusPassed' }
        | { __typename: 'BountyEntryStatusRejected' }
        | { __typename: 'BountyEntryStatusWinner'; reward: number }
        | { __typename: 'BountyEntryStatusWithdrawn' }
        | { __typename: 'BountyEntryStatusWorking' }
    }>
    createdInEvent: { __typename: 'BountyCreatedEvent'; inBlock: number }
  }>
}

export type GetBountiesCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BountyWhereInput>
}>

export type GetBountiesCountQuery = {
  __typename: 'Query'
  bountiesConnection: { __typename: 'BountyConnection'; totalCount: number }
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
        createdAt: any
        title: string
        cherry: any
        entrantStake: any
        workPeriod: number
        judgingPeriod: number
        stage: Types.BountyStage
        totalFunding: any
        creator?:
          | {
              __typename: 'Membership'
              id: string
              rootAccount: string
              controllerAccount: string
              boundAccounts: Array<string>
              handle: string
              isVerified: boolean
              isFoundingMember: boolean
              inviteCount: number
              createdAt: any
              metadata: {
                __typename: 'MemberMetadata'
                name?: string | null | undefined
                about?: string | null | undefined
                avatar?:
                  | { __typename: 'AvatarObject' }
                  | { __typename: 'AvatarUri'; avatarUri: string }
                  | null
                  | undefined
              }
              roles: Array<{
                __typename: 'Worker'
                id: string
                createdAt: any
                isLead: boolean
                group: { __typename: 'WorkingGroup'; name: string }
              }>
            }
          | null
          | undefined
        oracle?:
          | {
              __typename: 'Membership'
              id: string
              rootAccount: string
              controllerAccount: string
              boundAccounts: Array<string>
              handle: string
              isVerified: boolean
              isFoundingMember: boolean
              inviteCount: number
              createdAt: any
              metadata: {
                __typename: 'MemberMetadata'
                name?: string | null | undefined
                about?: string | null | undefined
                avatar?:
                  | { __typename: 'AvatarObject' }
                  | { __typename: 'AvatarUri'; avatarUri: string }
                  | null
                  | undefined
              }
              roles: Array<{
                __typename: 'Worker'
                id: string
                createdAt: any
                isLead: boolean
                group: { __typename: 'WorkingGroup'; name: string }
              }>
            }
          | null
          | undefined
        fundingType:
          | {
              __typename: 'BountyFundingLimited'
              minFundingAmount: number
              maxFundingAmount: number
              fundingPeriod: number
            }
          | { __typename: 'BountyFundingPerpetual'; target: number }
        entries: Array<{
          __typename: 'BountyEntry'
          worker: {
            __typename: 'Membership'
            id: string
            rootAccount: string
            controllerAccount: string
            boundAccounts: Array<string>
            handle: string
            isVerified: boolean
            isFoundingMember: boolean
            inviteCount: number
            createdAt: any
            metadata: {
              __typename: 'MemberMetadata'
              name?: string | null | undefined
              about?: string | null | undefined
              avatar?:
                | { __typename: 'AvatarObject' }
                | { __typename: 'AvatarUri'; avatarUri: string }
                | null
                | undefined
            }
            roles: Array<{
              __typename: 'Worker'
              id: string
              createdAt: any
              isLead: boolean
              group: { __typename: 'WorkingGroup'; name: string }
            }>
          }
          status:
            | { __typename: 'BountyEntryStatusCashedOut' }
            | { __typename: 'BountyEntryStatusPassed' }
            | { __typename: 'BountyEntryStatusRejected' }
            | { __typename: 'BountyEntryStatusWinner'; reward: number }
            | { __typename: 'BountyEntryStatusWithdrawn' }
            | { __typename: 'BountyEntryStatusWorking' }
        }>
        createdInEvent: { __typename: 'BountyCreatedEvent'; inBlock: number }
      }
    | null
    | undefined
}

export const BountyFieldsFragmentDoc = gql`
  fragment BountyFields on Bounty {
    id
    createdAt
    title
    cherry
    entrantStake
    creator {
      ...MemberFields
    }
    oracle {
      ...MemberFields
    }
    fundingType {
      ... on BountyFundingLimited {
        minFundingAmount
        maxFundingAmount
        fundingPeriod
      }
      ... on BountyFundingPerpetual {
        target
      }
    }
    workPeriod
    judgingPeriod
    stage
    totalFunding
    entries {
      worker {
        ...MemberFields
      }
      status {
        ... on BountyEntryStatusWinner {
          reward
        }
      }
    }
    createdInEvent {
      inBlock
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const GetBountiesDocument = gql`
  query GetBounties($where: BountyWhereInput, $orderBy: [BountyOrderByInput!], $offset: Int, $limit: Int) {
    bounties(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
      ...BountyFields
    }
  }
  ${BountyFieldsFragmentDoc}
`

/**
 * __useGetBountiesQuery__
 *
 * To run a query within a React component, call `useGetBountiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountiesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetBountiesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBountiesQuery, GetBountiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountiesQuery, GetBountiesQueryVariables>(GetBountiesDocument, options)
}
export function useGetBountiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountiesQuery, GetBountiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountiesQuery, GetBountiesQueryVariables>(GetBountiesDocument, options)
}
export type GetBountiesQueryHookResult = ReturnType<typeof useGetBountiesQuery>
export type GetBountiesLazyQueryHookResult = ReturnType<typeof useGetBountiesLazyQuery>
export type GetBountiesQueryResult = Apollo.QueryResult<GetBountiesQuery, GetBountiesQueryVariables>
export const GetBountiesCountDocument = gql`
  query GetBountiesCount($where: BountyWhereInput) {
    bountiesConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetBountiesCountQuery__
 *
 * To run a query within a React component, call `useGetBountiesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountiesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountiesCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBountiesCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBountiesCountQuery, GetBountiesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountiesCountQuery, GetBountiesCountQueryVariables>(GetBountiesCountDocument, options)
}
export function useGetBountiesCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountiesCountQuery, GetBountiesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountiesCountQuery, GetBountiesCountQueryVariables>(GetBountiesCountDocument, options)
}
export type GetBountiesCountQueryHookResult = ReturnType<typeof useGetBountiesCountQuery>
export type GetBountiesCountLazyQueryHookResult = ReturnType<typeof useGetBountiesCountLazyQuery>
export type GetBountiesCountQueryResult = Apollo.QueryResult<GetBountiesCountQuery, GetBountiesCountQueryVariables>
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
