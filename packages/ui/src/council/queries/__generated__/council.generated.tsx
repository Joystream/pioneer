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

export type ElectedCouncilFieldsFragment = {
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

export type PastCouncilFieldsFragment = {
  __typename: 'ElectedCouncil'
  id: string
  endedAtBlock?: number | null | undefined
}

export type PastCouncilDetailedFieldsFragment = {
  __typename: 'ElectedCouncil'
  id: string
  endedAtBlock?: number | null | undefined
  councilMembers: Array<{ __typename: 'CouncilMember'; accumulatedReward: any; unpaidReward: any }>
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

export type PastElectionRoundFieldsFragment = {
  __typename: 'ElectionRound'
  id: string
  cycleId: number
  updatedAt?: any | null | undefined
  candidates: Array<{ __typename: 'Candidate'; stake: any }>
  castVotes: Array<{ __typename: 'CastVote'; voteForId?: string | null | undefined }>
}

export type PastElectionRoundDetailedFieldsFragment = {
  __typename: 'ElectionRound'
  id: string
  cycleId: number
  updatedAt?: any | null | undefined
  candidates: Array<{
    __typename: 'Candidate'
    stake: any
    id: string
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
  castVotes: Array<{
    __typename: 'CastVote'
    id: string
    stake: any
    stakeLocked: boolean
    voteForId?: string | null | undefined
    castBy: string
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
  id: string
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
  electionRound: { __typename: 'ElectionRound'; cycleId: number }
}

export type CouncilSpendingEventFieldsFragment = {
  __typename: 'BudgetSpendingEvent'
  amount: any
  type?: Types.EventTypeOptions | null | undefined
}

export type GetElectedCouncilQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetElectedCouncilQuery = {
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

export type GetPastCouncilsQueryVariables = Types.Exact<{
  offset?: Types.Maybe<Types.Scalars['Int']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  orderBy?: Types.Maybe<Array<Types.ElectedCouncilOrderByInput> | Types.ElectedCouncilOrderByInput>
}>

export type GetPastCouncilsQuery = {
  __typename: 'Query'
  electedCouncils: Array<{ __typename: 'ElectedCouncil'; id: string; endedAtBlock?: number | null | undefined }>
}

export type GetPastCouncilsCountQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetPastCouncilsCountQuery = {
  __typename: 'Query'
  electedCouncilsConnection: { __typename: 'ElectedCouncilConnection'; totalCount: number }
}

export type GetPastCouncilQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
  fromBlock: Types.Scalars['Int']
  toBlock: Types.Scalars['Int']
}>

export type GetPastCouncilQuery = {
  __typename: 'Query'
  electedCouncilByUniqueInput?:
    | {
        __typename: 'ElectedCouncil'
        id: string
        endedAtBlock?: number | null | undefined
        councilMembers: Array<{ __typename: 'CouncilMember'; accumulatedReward: any; unpaidReward: any }>
      }
    | null
    | undefined
  budgetSpendingEvents: Array<{
    __typename: 'BudgetSpendingEvent'
    amount: any
    type?: Types.EventTypeOptions | null | undefined
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

export type GetPastElectionsQueryVariables = Types.Exact<{
  offset?: Types.Maybe<Types.Scalars['Int']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  orderBy?: Types.Maybe<Array<Types.ElectionRoundOrderByInput> | Types.ElectionRoundOrderByInput>
}>

export type GetPastElectionsQuery = {
  __typename: 'Query'
  electionRounds: Array<{
    __typename: 'ElectionRound'
    id: string
    cycleId: number
    updatedAt?: any | null | undefined
    candidates: Array<{ __typename: 'Candidate'; stake: any }>
    castVotes: Array<{ __typename: 'CastVote'; voteForId?: string | null | undefined }>
  }>
}

export type GetPastElectionsCountQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetPastElectionsCountQuery = {
  __typename: 'Query'
  electionRoundsConnection: { __typename: 'ElectionRoundConnection'; totalCount: number }
}

export type GetPastElectionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPastElectionQuery = {
  __typename: 'Query'
  electionRoundByUniqueInput?:
    | {
        __typename: 'ElectionRound'
        id: string
        cycleId: number
        updatedAt?: any | null | undefined
        candidates: Array<{
          __typename: 'Candidate'
          stake: any
          id: string
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
        }>
        castVotes: Array<{
          __typename: 'CastVote'
          id: string
          stake: any
          stakeLocked: boolean
          voteForId?: string | null | undefined
          castBy: string
        }>
      }
    | null
    | undefined
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

export type GetCouncilVotesQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.CastVoteWhereInput>
  orderBy?: Types.Maybe<Array<Types.CastVoteOrderByInput> | Types.CastVoteOrderByInput>
}>

export type GetCouncilVotesQuery = {
  __typename: 'Query'
  castVotes: Array<{
    __typename: 'CastVote'
    id: string
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
    electionRound: { __typename: 'ElectionRound'; cycleId: number }
  }>
}

export type GetCouncilVotesCommitmentsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.CastVoteWhereInput>
  orderBy?: Types.Maybe<Array<Types.CastVoteOrderByInput> | Types.CastVoteOrderByInput>
}>

export type GetCouncilVotesCommitmentsQuery = {
  __typename: 'Query'
  castVotes: Array<{ __typename: 'CastVote'; id: string; commitment: string }>
}

export type GetCouncilVotesCountQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.CastVoteWhereInput>
}>

export type GetCouncilVotesCountQuery = {
  __typename: 'Query'
  castVotesConnection: { __typename: 'CastVoteConnection'; totalCount: number }
}

export type GetPastVotesResultsQueryVariables = Types.Exact<{
  myAccounts?: Types.Maybe<Array<Types.Scalars['String']> | Types.Scalars['String']>
}>

export type GetPastVotesResultsQuery = {
  __typename: 'Query'
  electionRounds: Array<{
    __typename: 'ElectionRound'
    id: string
    electedCouncil: {
      __typename: 'ElectedCouncil'
      councilMembers: Array<{ __typename: 'CouncilMember'; member: { __typename: 'Membership'; id: string } }>
    }
  }>
  castVotes: Array<{
    __typename: 'CastVote'
    voteFor?: { __typename: 'Membership'; id: string } | null | undefined
    electionRound: { __typename: 'ElectionRound'; id: string }
  }>
}

export type GetCouncilBlockRangeQueryVariables = Types.Exact<{
  where: Types.ElectedCouncilWhereUniqueInput
}>

export type GetCouncilBlockRangeQuery = {
  __typename: 'Query'
  electedCouncilByUniqueInput?:
    | { __typename: 'ElectedCouncil'; electedAtBlock: number; endedAtBlock?: number | null | undefined }
    | null
    | undefined
}

export type GetCouncilProposalsStatsQueryVariables = Types.Exact<{
  startBlock: Types.Scalars['Int']
  endBlock: Types.Scalars['Int']
}>

export type GetCouncilProposalsStatsQuery = {
  __typename: 'Query'
  approved: { __typename: 'ProposalExecutedEventConnection'; totalCount: number }
  rejected: { __typename: 'ProposalDecisionMadeEventConnection'; totalCount: number }
  slashed: { __typename: 'ProposalDecisionMadeEventConnection'; totalCount: number }
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
export const ElectedCouncilFieldsFragmentDoc = gql`
  fragment ElectedCouncilFields on ElectedCouncil {
    id
    electedAtBlock
    councilMembers {
      ...CouncilMemberFields
    }
  }
  ${CouncilMemberFieldsFragmentDoc}
`
export const PastCouncilFieldsFragmentDoc = gql`
  fragment PastCouncilFields on ElectedCouncil {
    id
    endedAtBlock
  }
`
export const PastCouncilDetailedFieldsFragmentDoc = gql`
  fragment PastCouncilDetailedFields on ElectedCouncil {
    ...PastCouncilFields
    councilMembers {
      accumulatedReward
      unpaidReward
    }
  }
  ${PastCouncilFieldsFragmentDoc}
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
export const PastElectionRoundFieldsFragmentDoc = gql`
  fragment PastElectionRoundFields on ElectionRound {
    id
    cycleId
    updatedAt
    candidates {
      stake
    }
    castVotes {
      voteForId
    }
  }
`
export const PastElectionRoundDetailedFieldsFragmentDoc = gql`
  fragment PastElectionRoundDetailedFields on ElectionRound {
    ...PastElectionRoundFields
    candidates {
      ...ElectionCandidateFields
    }
    castVotes {
      id
      stake
      stakeLocked
      voteForId
      castBy
    }
  }
  ${PastElectionRoundFieldsFragmentDoc}
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
    id
    stake
    stakeLocked
    castBy
    voteFor {
      ...MemberFields
    }
    electionRound {
      cycleId
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const CouncilSpendingEventFieldsFragmentDoc = gql`
  fragment CouncilSpendingEventFields on BudgetSpendingEvent {
    amount
    type
  }
`
export const GetElectedCouncilDocument = gql`
  query GetElectedCouncil {
    electedCouncils(where: { endedAtBlock_eq: null }, orderBy: [createdAt_DESC], limit: 1) {
      ...ElectedCouncilFields
    }
  }
  ${ElectedCouncilFieldsFragmentDoc}
`

/**
 * __useGetElectedCouncilQuery__
 *
 * To run a query within a React component, call `useGetElectedCouncilQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectedCouncilQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectedCouncilQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetElectedCouncilQuery(
  baseOptions?: Apollo.QueryHookOptions<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>(GetElectedCouncilDocument, options)
}
export function useGetElectedCouncilLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>(
    GetElectedCouncilDocument,
    options
  )
}
export type GetElectedCouncilQueryHookResult = ReturnType<typeof useGetElectedCouncilQuery>
export type GetElectedCouncilLazyQueryHookResult = ReturnType<typeof useGetElectedCouncilLazyQuery>
export type GetElectedCouncilQueryResult = Apollo.QueryResult<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>
export const GetPastCouncilsDocument = gql`
  query GetPastCouncils($offset: Int, $limit: Int, $orderBy: [ElectedCouncilOrderByInput!]) {
    electedCouncils(where: { isResigned_eq: true }, offset: $offset, limit: $limit, orderBy: $orderBy) {
      ...PastCouncilFields
    }
  }
  ${PastCouncilFieldsFragmentDoc}
`

/**
 * __useGetPastCouncilsQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetPastCouncilsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>(GetPastCouncilsDocument, options)
}
export function useGetPastCouncilsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>(GetPastCouncilsDocument, options)
}
export type GetPastCouncilsQueryHookResult = ReturnType<typeof useGetPastCouncilsQuery>
export type GetPastCouncilsLazyQueryHookResult = ReturnType<typeof useGetPastCouncilsLazyQuery>
export type GetPastCouncilsQueryResult = Apollo.QueryResult<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>
export const GetPastCouncilsCountDocument = gql`
  query GetPastCouncilsCount {
    electedCouncilsConnection(where: { isResigned_eq: true }) {
      totalCount
    }
  }
`

/**
 * __useGetPastCouncilsCountQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPastCouncilsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastCouncilsCountQuery, GetPastCouncilsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilsCountQuery, GetPastCouncilsCountQueryVariables>(
    GetPastCouncilsCountDocument,
    options
  )
}
export function useGetPastCouncilsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilsCountQuery, GetPastCouncilsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilsCountQuery, GetPastCouncilsCountQueryVariables>(
    GetPastCouncilsCountDocument,
    options
  )
}
export type GetPastCouncilsCountQueryHookResult = ReturnType<typeof useGetPastCouncilsCountQuery>
export type GetPastCouncilsCountLazyQueryHookResult = ReturnType<typeof useGetPastCouncilsCountLazyQuery>
export type GetPastCouncilsCountQueryResult = Apollo.QueryResult<
  GetPastCouncilsCountQuery,
  GetPastCouncilsCountQueryVariables
>
export const GetPastCouncilDocument = gql`
  query GetPastCouncil($id: ID!, $fromBlock: Int!, $toBlock: Int!) {
    electedCouncilByUniqueInput(where: { id: $id }) {
      ...PastCouncilDetailedFields
    }
    budgetSpendingEvents(where: { inBlock_gte: $fromBlock, inBlock_lte: $toBlock }) {
      ...CouncilSpendingEventFields
    }
  }
  ${PastCouncilDetailedFieldsFragmentDoc}
  ${CouncilSpendingEventFieldsFragmentDoc}
`

/**
 * __useGetPastCouncilQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilQuery({
 *   variables: {
 *      id: // value for 'id'
 *      fromBlock: // value for 'fromBlock'
 *      toBlock: // value for 'toBlock'
 *   },
 * });
 */
export function useGetPastCouncilQuery(
  baseOptions: Apollo.QueryHookOptions<GetPastCouncilQuery, GetPastCouncilQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilQuery, GetPastCouncilQueryVariables>(GetPastCouncilDocument, options)
}
export function useGetPastCouncilLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilQuery, GetPastCouncilQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilQuery, GetPastCouncilQueryVariables>(GetPastCouncilDocument, options)
}
export type GetPastCouncilQueryHookResult = ReturnType<typeof useGetPastCouncilQuery>
export type GetPastCouncilLazyQueryHookResult = ReturnType<typeof useGetPastCouncilLazyQuery>
export type GetPastCouncilQueryResult = Apollo.QueryResult<GetPastCouncilQuery, GetPastCouncilQueryVariables>
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
export const GetPastElectionsDocument = gql`
  query GetPastElections($offset: Int, $limit: Int, $orderBy: [ElectionRoundOrderByInput!]) {
    electionRounds(where: { isFinished_eq: true }, offset: $offset, limit: $limit, orderBy: $orderBy) {
      ...PastElectionRoundFields
    }
  }
  ${PastElectionRoundFieldsFragmentDoc}
`

/**
 * __useGetPastElectionsQuery__
 *
 * To run a query within a React component, call `useGetPastElectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastElectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastElectionsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetPastElectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastElectionsQuery, GetPastElectionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastElectionsQuery, GetPastElectionsQueryVariables>(GetPastElectionsDocument, options)
}
export function useGetPastElectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastElectionsQuery, GetPastElectionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastElectionsQuery, GetPastElectionsQueryVariables>(GetPastElectionsDocument, options)
}
export type GetPastElectionsQueryHookResult = ReturnType<typeof useGetPastElectionsQuery>
export type GetPastElectionsLazyQueryHookResult = ReturnType<typeof useGetPastElectionsLazyQuery>
export type GetPastElectionsQueryResult = Apollo.QueryResult<GetPastElectionsQuery, GetPastElectionsQueryVariables>
export const GetPastElectionsCountDocument = gql`
  query GetPastElectionsCount {
    electionRoundsConnection(where: { isFinished_eq: true }) {
      totalCount
    }
  }
`

/**
 * __useGetPastElectionsCountQuery__
 *
 * To run a query within a React component, call `useGetPastElectionsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastElectionsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastElectionsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPastElectionsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastElectionsCountQuery, GetPastElectionsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastElectionsCountQuery, GetPastElectionsCountQueryVariables>(
    GetPastElectionsCountDocument,
    options
  )
}
export function useGetPastElectionsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastElectionsCountQuery, GetPastElectionsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastElectionsCountQuery, GetPastElectionsCountQueryVariables>(
    GetPastElectionsCountDocument,
    options
  )
}
export type GetPastElectionsCountQueryHookResult = ReturnType<typeof useGetPastElectionsCountQuery>
export type GetPastElectionsCountLazyQueryHookResult = ReturnType<typeof useGetPastElectionsCountLazyQuery>
export type GetPastElectionsCountQueryResult = Apollo.QueryResult<
  GetPastElectionsCountQuery,
  GetPastElectionsCountQueryVariables
>
export const GetPastElectionDocument = gql`
  query GetPastElection($id: ID!) {
    electionRoundByUniqueInput(where: { id: $id }) {
      ...PastElectionRoundDetailedFields
    }
  }
  ${PastElectionRoundDetailedFieldsFragmentDoc}
`

/**
 * __useGetPastElectionQuery__
 *
 * To run a query within a React component, call `useGetPastElectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastElectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastElectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPastElectionQuery(
  baseOptions: Apollo.QueryHookOptions<GetPastElectionQuery, GetPastElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastElectionQuery, GetPastElectionQueryVariables>(GetPastElectionDocument, options)
}
export function useGetPastElectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastElectionQuery, GetPastElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastElectionQuery, GetPastElectionQueryVariables>(GetPastElectionDocument, options)
}
export type GetPastElectionQueryHookResult = ReturnType<typeof useGetPastElectionQuery>
export type GetPastElectionLazyQueryHookResult = ReturnType<typeof useGetPastElectionLazyQuery>
export type GetPastElectionQueryResult = Apollo.QueryResult<GetPastElectionQuery, GetPastElectionQueryVariables>
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
export const GetCouncilVotesDocument = gql`
  query GetCouncilVotes($where: CastVoteWhereInput, $orderBy: [CastVoteOrderByInput!]) {
    castVotes(where: $where, orderBy: $orderBy) {
      ...CastVoteFields
    }
  }
  ${CastVoteFieldsFragmentDoc}
`

/**
 * __useGetCouncilVotesQuery__
 *
 * To run a query within a React component, call `useGetCouncilVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilVotesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetCouncilVotesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>(GetCouncilVotesDocument, options)
}
export function useGetCouncilVotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>(GetCouncilVotesDocument, options)
}
export type GetCouncilVotesQueryHookResult = ReturnType<typeof useGetCouncilVotesQuery>
export type GetCouncilVotesLazyQueryHookResult = ReturnType<typeof useGetCouncilVotesLazyQuery>
export type GetCouncilVotesQueryResult = Apollo.QueryResult<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>
export const GetCouncilVotesCommitmentsDocument = gql`
  query GetCouncilVotesCommitments($where: CastVoteWhereInput, $orderBy: [CastVoteOrderByInput!]) {
    castVotes(where: $where, orderBy: $orderBy) {
      id
      commitment
    }
  }
`

/**
 * __useGetCouncilVotesCommitmentsQuery__
 *
 * To run a query within a React component, call `useGetCouncilVotesCommitmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilVotesCommitmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilVotesCommitmentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetCouncilVotesCommitmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCouncilVotesCommitmentsQuery, GetCouncilVotesCommitmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilVotesCommitmentsQuery, GetCouncilVotesCommitmentsQueryVariables>(
    GetCouncilVotesCommitmentsDocument,
    options
  )
}
export function useGetCouncilVotesCommitmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilVotesCommitmentsQuery, GetCouncilVotesCommitmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilVotesCommitmentsQuery, GetCouncilVotesCommitmentsQueryVariables>(
    GetCouncilVotesCommitmentsDocument,
    options
  )
}
export type GetCouncilVotesCommitmentsQueryHookResult = ReturnType<typeof useGetCouncilVotesCommitmentsQuery>
export type GetCouncilVotesCommitmentsLazyQueryHookResult = ReturnType<typeof useGetCouncilVotesCommitmentsLazyQuery>
export type GetCouncilVotesCommitmentsQueryResult = Apollo.QueryResult<
  GetCouncilVotesCommitmentsQuery,
  GetCouncilVotesCommitmentsQueryVariables
>
export const GetCouncilVotesCountDocument = gql`
  query GetCouncilVotesCount($where: CastVoteWhereInput) {
    castVotesConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetCouncilVotesCountQuery__
 *
 * To run a query within a React component, call `useGetCouncilVotesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilVotesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilVotesCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCouncilVotesCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCouncilVotesCountQuery, GetCouncilVotesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilVotesCountQuery, GetCouncilVotesCountQueryVariables>(
    GetCouncilVotesCountDocument,
    options
  )
}
export function useGetCouncilVotesCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilVotesCountQuery, GetCouncilVotesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilVotesCountQuery, GetCouncilVotesCountQueryVariables>(
    GetCouncilVotesCountDocument,
    options
  )
}
export type GetCouncilVotesCountQueryHookResult = ReturnType<typeof useGetCouncilVotesCountQuery>
export type GetCouncilVotesCountLazyQueryHookResult = ReturnType<typeof useGetCouncilVotesCountLazyQuery>
export type GetCouncilVotesCountQueryResult = Apollo.QueryResult<
  GetCouncilVotesCountQuery,
  GetCouncilVotesCountQueryVariables
>
export const GetPastVotesResultsDocument = gql`
  query GetPastVotesResults($myAccounts: [String!]) {
    electionRounds(where: { isFinished_eq: true, castVotes_some: { castBy_in: $myAccounts } }) {
      id
      electedCouncil {
        councilMembers {
          member {
            id
          }
        }
      }
    }
    castVotes(where: { castBy_in: $myAccounts }) {
      voteFor {
        id
      }
      electionRound {
        id
      }
    }
  }
`

/**
 * __useGetPastVotesResultsQuery__
 *
 * To run a query within a React component, call `useGetPastVotesResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastVotesResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastVotesResultsQuery({
 *   variables: {
 *      myAccounts: // value for 'myAccounts'
 *   },
 * });
 */
export function useGetPastVotesResultsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastVotesResultsQuery, GetPastVotesResultsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastVotesResultsQuery, GetPastVotesResultsQueryVariables>(
    GetPastVotesResultsDocument,
    options
  )
}
export function useGetPastVotesResultsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastVotesResultsQuery, GetPastVotesResultsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastVotesResultsQuery, GetPastVotesResultsQueryVariables>(
    GetPastVotesResultsDocument,
    options
  )
}
export type GetPastVotesResultsQueryHookResult = ReturnType<typeof useGetPastVotesResultsQuery>
export type GetPastVotesResultsLazyQueryHookResult = ReturnType<typeof useGetPastVotesResultsLazyQuery>
export type GetPastVotesResultsQueryResult = Apollo.QueryResult<
  GetPastVotesResultsQuery,
  GetPastVotesResultsQueryVariables
>
export const GetCouncilBlockRangeDocument = gql`
  query GetCouncilBlockRange($where: ElectedCouncilWhereUniqueInput!) {
    electedCouncilByUniqueInput(where: $where) {
      electedAtBlock
      endedAtBlock
    }
  }
`

/**
 * __useGetCouncilBlockRangeQuery__
 *
 * To run a query within a React component, call `useGetCouncilBlockRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilBlockRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilBlockRangeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCouncilBlockRangeQuery(
  baseOptions: Apollo.QueryHookOptions<GetCouncilBlockRangeQuery, GetCouncilBlockRangeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilBlockRangeQuery, GetCouncilBlockRangeQueryVariables>(
    GetCouncilBlockRangeDocument,
    options
  )
}
export function useGetCouncilBlockRangeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilBlockRangeQuery, GetCouncilBlockRangeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilBlockRangeQuery, GetCouncilBlockRangeQueryVariables>(
    GetCouncilBlockRangeDocument,
    options
  )
}
export type GetCouncilBlockRangeQueryHookResult = ReturnType<typeof useGetCouncilBlockRangeQuery>
export type GetCouncilBlockRangeLazyQueryHookResult = ReturnType<typeof useGetCouncilBlockRangeLazyQuery>
export type GetCouncilBlockRangeQueryResult = Apollo.QueryResult<
  GetCouncilBlockRangeQuery,
  GetCouncilBlockRangeQueryVariables
>
export const GetCouncilProposalsStatsDocument = gql`
  query GetCouncilProposalsStats($startBlock: Int!, $endBlock: Int!) {
    approved: proposalExecutedEventsConnection(where: { inBlock_gt: $startBlock, inBlock_lt: $endBlock }) {
      totalCount
    }
    rejected: proposalDecisionMadeEventsConnection(
      where: {
        inBlock_gt: $startBlock
        inBlock_lt: $endBlock
        decisionStatus_json: { isTypeOf_eq: "ProposalStatusRejected" }
      }
    ) {
      totalCount
    }
    slashed: proposalDecisionMadeEventsConnection(
      where: {
        inBlock_gt: $startBlock
        inBlock_lt: $endBlock
        decisionStatus_json: { isTypeOf_eq: "ProposalStatusSlashed" }
      }
    ) {
      totalCount
    }
  }
`

/**
 * __useGetCouncilProposalsStatsQuery__
 *
 * To run a query within a React component, call `useGetCouncilProposalsStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilProposalsStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilProposalsStatsQuery({
 *   variables: {
 *      startBlock: // value for 'startBlock'
 *      endBlock: // value for 'endBlock'
 *   },
 * });
 */
export function useGetCouncilProposalsStatsQuery(
  baseOptions: Apollo.QueryHookOptions<GetCouncilProposalsStatsQuery, GetCouncilProposalsStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilProposalsStatsQuery, GetCouncilProposalsStatsQueryVariables>(
    GetCouncilProposalsStatsDocument,
    options
  )
}
export function useGetCouncilProposalsStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilProposalsStatsQuery, GetCouncilProposalsStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilProposalsStatsQuery, GetCouncilProposalsStatsQueryVariables>(
    GetCouncilProposalsStatsDocument,
    options
  )
}
export type GetCouncilProposalsStatsQueryHookResult = ReturnType<typeof useGetCouncilProposalsStatsQuery>
export type GetCouncilProposalsStatsLazyQueryHookResult = ReturnType<typeof useGetCouncilProposalsStatsLazyQuery>
export type GetCouncilProposalsStatsQueryResult = Apollo.QueryResult<
  GetCouncilProposalsStatsQuery,
  GetCouncilProposalsStatsQueryVariables
>
