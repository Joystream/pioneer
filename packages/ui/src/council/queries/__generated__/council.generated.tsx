import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import { MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type CouncilMemberFieldsFragment = {
  __typename: 'CouncilMember'
  id: string
  unpaidReward: any
  stake: any
  member: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    inviteCount: number
    createdAt: any
    councilMembers: Array<{ __typename: 'CouncilMember' }>
    metadata: { __typename: 'MemberMetadata'; name?: string | null | undefined; about?: string | null | undefined }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
  }
}

export type ElectedCouncilsFieldsFragment = {
  __typename: 'ElectedCouncil'
  id: string
  electedAtBlock: number
  councilMembers: Array<{
    __typename: 'CouncilMember'
    id: string
    unpaidReward: any
    stake: any
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      inviteCount: number
      createdAt: any
      councilMembers: Array<{ __typename: 'CouncilMember' }>
      metadata: { __typename: 'MemberMetadata'; name?: string | null | undefined; about?: string | null | undefined }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
    }
  }>
}

export type ElectionCandidateFieldsFragment = {
  __typename: 'Candidate'
  id: string
  stake: any
  member: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    inviteCount: number
    createdAt: any
    metadata: { __typename: 'MemberMetadata'; name?: string | null | undefined; about?: string | null | undefined }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
  }
  noteMetadata: {
    __typename: 'CandidacyNoteMetadata'
    header?: string | null | undefined
    bulletPoints: Array<string>
    bannerImageUri?: string | null | undefined
    description?: string | null | undefined
  }
}

export type ElectionRoundFieldsFragment = {
  __typename: 'ElectionRound'
  cycleId: number
  candidates: Array<{
    __typename: 'Candidate'
    id: string
    stake: any
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      inviteCount: number
      createdAt: any
      metadata: { __typename: 'MemberMetadata'; name?: string | null | undefined; about?: string | null | undefined }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
    }
    noteMetadata: {
      __typename: 'CandidacyNoteMetadata'
      header?: string | null | undefined
      bulletPoints: Array<string>
      bannerImageUri?: string | null | undefined
      description?: string | null | undefined
    }
  }>
}

export type ElectionCandidateDetailedFieldsFragment = {
  __typename: 'Candidate'
  stakingAccountId: string
  rewardAccountId: string
  id: string
  stake: any
  electionRound: { __typename: 'ElectionRound'; cycleId: number; isFinished: boolean }
  member: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    inviteCount: number
    createdAt: any
    metadata: { __typename: 'MemberMetadata'; name?: string | null | undefined; about?: string | null | undefined }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
  }
  noteMetadata: {
    __typename: 'CandidacyNoteMetadata'
    header?: string | null | undefined
    bulletPoints: Array<string>
    bannerImageUri?: string | null | undefined
    description?: string | null | undefined
  }
}

export type CastVoteFieldsFragment = {
  __typename: 'CastVote'
  stake: any
  stakeLocked: boolean
  castBy: string
  voteFor?:
    | {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        inviteCount: number
        createdAt: any
        metadata: { __typename: 'MemberMetadata'; name?: string | null | undefined; about?: string | null | undefined }
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
}

export type GetElectedCouncilsQueryVariables = Types.Exact<{
  where: Types.ElectedCouncilWhereInput
}>

export type GetElectedCouncilsQuery = {
  __typename: 'Query'
  electedCouncils: Array<{
    __typename: 'ElectedCouncil'
    id: string
    electedAtBlock: number
    councilMembers: Array<{
      __typename: 'CouncilMember'
      id: string
      unpaidReward: any
      stake: any
      member: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        inviteCount: number
        createdAt: any
        councilMembers: Array<{ __typename: 'CouncilMember' }>
        metadata: { __typename: 'MemberMetadata'; name?: string | null | undefined; about?: string | null | undefined }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
      }
    }>
  }>
}

export type GetCurrentElectionQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetCurrentElectionQuery = {
  __typename: 'Query'
  electionRounds: Array<{
    __typename: 'ElectionRound'
    cycleId: number
    candidates: Array<{
      __typename: 'Candidate'
      id: string
      stake: any
      member: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        inviteCount: number
        createdAt: any
        metadata: { __typename: 'MemberMetadata'; name?: string | null | undefined; about?: string | null | undefined }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
      }
      noteMetadata: {
        __typename: 'CandidacyNoteMetadata'
        header?: string | null | undefined
        bulletPoints: Array<string>
        bannerImageUri?: string | null | undefined
        description?: string | null | undefined
      }
    }>
  }>
}

export type GetCandidateQueryVariables = Types.Exact<{
  where: Types.CandidateWhereUniqueInput
}>

export type GetCandidateQuery = {
  __typename: 'Query'
  candidateByUniqueInput?:
    | {
        __typename: 'Candidate'
        stakingAccountId: string
        rewardAccountId: string
        id: string
        stake: any
        electionRound: { __typename: 'ElectionRound'; cycleId: number; isFinished: boolean }
        member: {
          __typename: 'Membership'
          id: string
          rootAccount: string
          controllerAccount: string
          handle: string
          isVerified: boolean
          isFoundingMember: boolean
          inviteCount: number
          createdAt: any
          metadata: {
            __typename: 'MemberMetadata'
            name?: string | null | undefined
            about?: string | null | undefined
          }
          roles: Array<{
            __typename: 'Worker'
            id: string
            createdAt: any
            isLead: boolean
            group: { __typename: 'WorkingGroup'; name: string }
          }>
        }
        noteMetadata: {
          __typename: 'CandidacyNoteMetadata'
          header?: string | null | undefined
          bulletPoints: Array<string>
          bannerImageUri?: string | null | undefined
          description?: string | null | undefined
        }
      }
    | null
    | undefined
}

export type GetElectionCandidatesIdsQueryVariables = Types.Exact<{
  electionCycleId: Types.Scalars['Int']
}>

export type GetElectionCandidatesIdsQuery = {
  __typename: 'Query'
  candidates: Array<{ __typename: 'Candidate'; id: string }>
}

export type GetCandidateStatsQueryVariables = Types.Exact<{
  memberId?: Types.Maybe<Types.Scalars['ID']>
}>

export type GetCandidateStatsQuery = {
  __typename: 'Query'
  candidacyWithdrawEventsConnection: { __typename: 'CandidacyWithdrawEventConnection'; totalCount: number }
  councilMembersConnection: { __typename: 'CouncilMemberConnection'; totalCount: number }
  candidatesConnection: { __typename: 'CandidateConnection'; totalCount: number }
}

export type GetElectionVotesQueryVariables = Types.Exact<{
  electionCycleId?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetElectionVotesQuery = {
  __typename: 'Query'
  castVotes: Array<{
    __typename: 'CastVote'
    stake: any
    stakeLocked: boolean
    castBy: string
    voteFor?:
      | {
          __typename: 'Membership'
          id: string
          rootAccount: string
          controllerAccount: string
          handle: string
          isVerified: boolean
          isFoundingMember: boolean
          inviteCount: number
          createdAt: any
          metadata: {
            __typename: 'MemberMetadata'
            name?: string | null | undefined
            about?: string | null | undefined
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
  }>
}

export const CouncilMemberFieldsFragmentDoc = gql`
  fragment CouncilMemberFields on CouncilMember {
    id
    member {
      ...MemberFields
      councilMembers {
        __typename
      }
    }
    unpaidReward
    stake
  }
  ${MemberFieldsFragmentDoc}
`
export const ElectedCouncilsFieldsFragmentDoc = gql`
  fragment ElectedCouncilsFields on ElectedCouncil {
    id
    electedAtBlock
    councilMembers {
      ...CouncilMemberFields
    }
  }
  ${CouncilMemberFieldsFragmentDoc}
`
export const ElectionCandidateFieldsFragmentDoc = gql`
  fragment ElectionCandidateFields on Candidate {
    id
    member {
      ...MemberFields
    }
    stake
    noteMetadata {
      header
      bulletPoints
      bannerImageUri
      description
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const ElectionRoundFieldsFragmentDoc = gql`
  fragment ElectionRoundFields on ElectionRound {
    cycleId
    candidates {
      ...ElectionCandidateFields
    }
  }
  ${ElectionCandidateFieldsFragmentDoc}
`
export const ElectionCandidateDetailedFieldsFragmentDoc = gql`
  fragment ElectionCandidateDetailedFields on Candidate {
    ...ElectionCandidateFields
    stakingAccountId
    rewardAccountId
    electionRound {
      cycleId
      isFinished
    }
  }
  ${ElectionCandidateFieldsFragmentDoc}
`
export const CastVoteFieldsFragmentDoc = gql`
  fragment CastVoteFields on CastVote {
    stake
    stakeLocked
    castBy
    voteFor {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const GetElectedCouncilsDocument = gql`
  query GetElectedCouncils($where: ElectedCouncilWhereInput!) {
    electedCouncils(where: $where) {
      ...ElectedCouncilsFields
    }
  }
  ${ElectedCouncilsFieldsFragmentDoc}
`

/**
 * __useGetElectedCouncilsQuery__
 *
 * To run a query within a React component, call `useGetElectedCouncilsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectedCouncilsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectedCouncilsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetElectedCouncilsQuery(
  baseOptions: Apollo.QueryHookOptions<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>(GetElectedCouncilsDocument, options)
}
export function useGetElectedCouncilsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>(
    GetElectedCouncilsDocument,
    options
  )
}
export type GetElectedCouncilsQueryHookResult = ReturnType<typeof useGetElectedCouncilsQuery>
export type GetElectedCouncilsLazyQueryHookResult = ReturnType<typeof useGetElectedCouncilsLazyQuery>
export type GetElectedCouncilsQueryResult = Apollo.QueryResult<
  GetElectedCouncilsQuery,
  GetElectedCouncilsQueryVariables
>
export const GetCurrentElectionDocument = gql`
  query GetCurrentElection {
    electionRounds(where: { isFinished_eq: false }, orderBy: [cycleId_DESC], limit: 1) {
      ...ElectionRoundFields
    }
  }
  ${ElectionRoundFieldsFragmentDoc}
`

/**
 * __useGetCurrentElectionQuery__
 *
 * To run a query within a React component, call `useGetCurrentElectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentElectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentElectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentElectionQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>(GetCurrentElectionDocument, options)
}
export function useGetCurrentElectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>(
    GetCurrentElectionDocument,
    options
  )
}
export type GetCurrentElectionQueryHookResult = ReturnType<typeof useGetCurrentElectionQuery>
export type GetCurrentElectionLazyQueryHookResult = ReturnType<typeof useGetCurrentElectionLazyQuery>
export type GetCurrentElectionQueryResult = Apollo.QueryResult<
  GetCurrentElectionQuery,
  GetCurrentElectionQueryVariables
>
export const GetCandidateDocument = gql`
  query GetCandidate($where: CandidateWhereUniqueInput!) {
    candidateByUniqueInput(where: $where) {
      ...ElectionCandidateDetailedFields
    }
  }
  ${ElectionCandidateDetailedFieldsFragmentDoc}
`

/**
 * __useGetCandidateQuery__
 *
 * To run a query within a React component, call `useGetCandidateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCandidateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCandidateQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCandidateQuery(
  baseOptions: Apollo.QueryHookOptions<GetCandidateQuery, GetCandidateQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCandidateQuery, GetCandidateQueryVariables>(GetCandidateDocument, options)
}
export function useGetCandidateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCandidateQuery, GetCandidateQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCandidateQuery, GetCandidateQueryVariables>(GetCandidateDocument, options)
}
export type GetCandidateQueryHookResult = ReturnType<typeof useGetCandidateQuery>
export type GetCandidateLazyQueryHookResult = ReturnType<typeof useGetCandidateLazyQuery>
export type GetCandidateQueryResult = Apollo.QueryResult<GetCandidateQuery, GetCandidateQueryVariables>
export const GetElectionCandidatesIdsDocument = gql`
  query GetElectionCandidatesIds($electionCycleId: Int!) {
    candidates(where: { electionRound: { cycleId_eq: $electionCycleId } }) {
      id
    }
  }
`

/**
 * __useGetElectionCandidatesIdsQuery__
 *
 * To run a query within a React component, call `useGetElectionCandidatesIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectionCandidatesIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectionCandidatesIdsQuery({
 *   variables: {
 *      electionCycleId: // value for 'electionCycleId'
 *   },
 * });
 */
export function useGetElectionCandidatesIdsQuery(
  baseOptions: Apollo.QueryHookOptions<GetElectionCandidatesIdsQuery, GetElectionCandidatesIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElectionCandidatesIdsQuery, GetElectionCandidatesIdsQueryVariables>(
    GetElectionCandidatesIdsDocument,
    options
  )
}
export function useGetElectionCandidatesIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetElectionCandidatesIdsQuery, GetElectionCandidatesIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElectionCandidatesIdsQuery, GetElectionCandidatesIdsQueryVariables>(
    GetElectionCandidatesIdsDocument,
    options
  )
}
export type GetElectionCandidatesIdsQueryHookResult = ReturnType<typeof useGetElectionCandidatesIdsQuery>
export type GetElectionCandidatesIdsLazyQueryHookResult = ReturnType<typeof useGetElectionCandidatesIdsLazyQuery>
export type GetElectionCandidatesIdsQueryResult = Apollo.QueryResult<
  GetElectionCandidatesIdsQuery,
  GetElectionCandidatesIdsQueryVariables
>
export const GetCandidateStatsDocument = gql`
  query GetCandidateStats($memberId: ID) {
    candidacyWithdrawEventsConnection(where: { member: { id_eq: $memberId } }) {
      totalCount
    }
    councilMembersConnection(where: { member: { id_eq: $memberId } }) {
      totalCount
    }
    candidatesConnection(where: { member: { id_eq: $memberId } }) {
      totalCount
    }
  }
`

/**
 * __useGetCandidateStatsQuery__
 *
 * To run a query within a React component, call `useGetCandidateStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCandidateStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCandidateStatsQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetCandidateStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>(GetCandidateStatsDocument, options)
}
export function useGetCandidateStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>(
    GetCandidateStatsDocument,
    options
  )
}
export type GetCandidateStatsQueryHookResult = ReturnType<typeof useGetCandidateStatsQuery>
export type GetCandidateStatsLazyQueryHookResult = ReturnType<typeof useGetCandidateStatsLazyQuery>
export type GetCandidateStatsQueryResult = Apollo.QueryResult<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>
export const GetElectionVotesDocument = gql`
  query GetElectionVotes($electionCycleId: Int) {
    castVotes(where: { electionRound: { cycleId_eq: $electionCycleId } }) {
      ...CastVoteFields
    }
  }
  ${CastVoteFieldsFragmentDoc}
`

/**
 * __useGetElectionVotesQuery__
 *
 * To run a query within a React component, call `useGetElectionVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectionVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectionVotesQuery({
 *   variables: {
 *      electionCycleId: // value for 'electionCycleId'
 *   },
 * });
 */
export function useGetElectionVotesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetElectionVotesQuery, GetElectionVotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElectionVotesQuery, GetElectionVotesQueryVariables>(GetElectionVotesDocument, options)
}
export function useGetElectionVotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetElectionVotesQuery, GetElectionVotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElectionVotesQuery, GetElectionVotesQueryVariables>(GetElectionVotesDocument, options)
}
export type GetElectionVotesQueryHookResult = ReturnType<typeof useGetElectionVotesQuery>
export type GetElectionVotesLazyQueryHookResult = ReturnType<typeof useGetElectionVotesLazyQuery>
export type GetElectionVotesQueryResult = Apollo.QueryResult<GetElectionVotesQuery, GetElectionVotesQueryVariables>
