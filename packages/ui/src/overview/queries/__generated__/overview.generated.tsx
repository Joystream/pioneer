import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import { ElectionCandidateFieldsFragmentDoc } from '../../../council/queries/__generated__/council.generated'
import {
  UpcomingWorkingGroupOpeningFieldsFragmentDoc,
  WorkingGroupOpeningFieldsFragmentDoc,
} from '../../../working-groups/queries/__generated__/workingGroups.generated'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetSidebarInfoQueryVariables = Types.Exact<{
  memberId: Types.Scalars['ID']
}>

export type GetSidebarInfoQuery = {
  __typename: 'Query'
  workers: Array<{
    __typename: 'Worker'
    isLead: boolean
    group: { __typename: 'WorkingGroup'; name: string }
    payouts: Array<{ __typename: 'RewardPaidEvent'; amount: string }>
  }>
  councilMembers: Array<{ __typename: 'CouncilMember'; accumulatedReward: string; id: string }>
  workingGroupApplications: Array<{
    __typename: 'WorkingGroupApplication'
    opening: {
      __typename: 'WorkingGroupOpening'
      group: { __typename: 'WorkingGroup'; name: string }
      metadata: { __typename: 'WorkingGroupOpeningMetadata'; expectedEnding?: any | null }
    }
  }>
  candidates: Array<{
    __typename: 'Candidate'
    noteMetadata: { __typename: 'CandidacyNoteMetadata'; id: string; header?: string | null }
  }>
  proposals: Array<{ __typename: 'Proposal'; id: string }>
  forumThreads: Array<{
    __typename: 'ForumThread'
    title: string
    posts: Array<{ __typename: 'ForumPost'; id: string }>
  }>
}

export type GetAllDeadLinesQueryVariables = Types.Exact<{
  proposalCreator?: Types.InputMaybe<Types.MembershipWhereInput>
  group?: Types.InputMaybe<Types.WorkingGroupWhereInput>
  isLead: Types.Scalars['Boolean']
}>

export type GetAllDeadLinesQuery = {
  __typename: 'Query'
  electionRounds: Array<{
    __typename: 'ElectionRound'
    cycleId: number
    candidates: Array<{
      __typename: 'Candidate'
      id: string
      stake: string
      status: Types.CandidacyStatus
      stakingAccountId: string
      votePower: string
      member: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        isCouncilMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null
          about?: string | null
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
        stakingaccountaddedeventmember?: Array<{
          __typename: 'StakingAccountAddedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
          account: string
        }> | null
      }
      noteMetadata: {
        __typename: 'CandidacyNoteMetadata'
        header?: string | null
        bulletPoints: Array<string>
        bannerImageUri?: string | null
        description?: string | null
      }
      votesReceived: Array<{ __typename: 'CastVote'; id: string }>
    }>
  }>
  proposals: Array<{ __typename: 'Proposal'; updatedAt?: any | null; id: string; title: string }>
  upcomingWorkingGroupOpenings?: Array<{
    __typename: 'UpcomingWorkingGroupOpening'
    id: string
    groupId: string
    expectedStart?: any | null
    stakeAmount?: string | null
    rewardPerBlock?: string | null
    group: { __typename: 'WorkingGroup'; name: string; budget: string; leaderId?: string | null }
    createdInEvent: { __typename: 'StatusTextChangedEvent'; createdAt: any; inBlock: number; network: Types.Network }
    metadata: {
      __typename: 'WorkingGroupOpeningMetadata'
      title?: string | null
      applicationDetails?: string | null
      shortDescription?: string | null
      description?: string | null
      hiringLimit?: number | null
      expectedEnding?: any | null
    }
  }>
  workingGroupOpenings?: Array<{
    __typename: 'WorkingGroupOpening'
    id: string
    runtimeId: number
    groupId: string
    type: Types.WorkingGroupOpeningType
    stakeAmount: string
    rewardPerBlock: string
    unstakingPeriod: number
    group: { __typename: 'WorkingGroup'; name: string; budget: string; leaderId?: string | null }
    createdInEvent: { __typename: 'OpeningAddedEvent'; inBlock: number; network: Types.Network; createdAt: any }
    metadata: {
      __typename: 'WorkingGroupOpeningMetadata'
      title?: string | null
      applicationDetails?: string | null
      shortDescription?: string | null
      description?: string | null
      hiringLimit?: number | null
      expectedEnding?: any | null
    }
    status:
      | { __typename: 'OpeningStatusCancelled' }
      | { __typename: 'OpeningStatusFilled' }
      | { __typename: 'OpeningStatusOpen' }
    applications: Array<{
      __typename: 'WorkingGroupApplication'
      id: string
      status:
        | { __typename: 'ApplicationStatusAccepted' }
        | { __typename: 'ApplicationStatusCancelled' }
        | { __typename: 'ApplicationStatusPending' }
        | { __typename: 'ApplicationStatusRejected' }
        | { __typename: 'ApplicationStatusWithdrawn' }
    }>
    openingfilledeventopening?: Array<{
      __typename: 'OpeningFilledEvent'
      workersHired: Array<{ __typename: 'Worker'; id: string }>
    }> | null
  }>
}

export const GetSidebarInfoDocument = gql`
  query GetSidebarInfo($memberId: ID!) {
    workers(where: { membership: { id_eq: $memberId } }) {
      group {
        name
      }
      isLead
      payouts {
        amount
      }
    }
    councilMembers(where: { member: { id_eq: $memberId } }) {
      accumulatedReward
      id
    }
    workingGroupApplications(
      where: { applicant: { id_eq: $memberId }, status_json: { isTypeOf_eq: "ApplicationStatusPending" } }
    ) {
      opening {
        group {
          name
        }
        metadata {
          expectedEnding
        }
      }
    }
    candidates(where: { status_eq: ACTIVE, member: { id_eq: $memberId } }) {
      noteMetadata {
        id
        header
      }
    }
    proposals(where: { creator: { id_eq: $memberId } }) {
      id
    }
    forumThreads(where: { author: { id_eq: $memberId } }) {
      title
      posts {
        id
      }
    }
  }
`

/**
 * __useGetSidebarInfoQuery__
 *
 * To run a query within a React component, call `useGetSidebarInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSidebarInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSidebarInfoQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetSidebarInfoQuery(
  baseOptions: Apollo.QueryHookOptions<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>(GetSidebarInfoDocument, options)
}
export function useGetSidebarInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>(GetSidebarInfoDocument, options)
}
export type GetSidebarInfoQueryHookResult = ReturnType<typeof useGetSidebarInfoQuery>
export type GetSidebarInfoLazyQueryHookResult = ReturnType<typeof useGetSidebarInfoLazyQuery>
export type GetSidebarInfoQueryResult = Apollo.QueryResult<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>
export const GetAllDeadLinesDocument = gql`
  query GetAllDeadLines($proposalCreator: MembershipWhereInput, $group: WorkingGroupWhereInput, $isLead: Boolean!) {
    electionRounds(where: { isFinished_eq: false }) {
      cycleId
      candidates {
        ...ElectionCandidateFields
      }
    }
    proposals(
      where: {
        creator: $proposalCreator
        isFinalized_eq: false
        status_json: { isTypeOf_eq: "ProposalStatusDeciding" }
      }
    ) {
      updatedAt
      id
      title
    }
    upcomingWorkingGroupOpenings(where: { group: $group }) @include(if: $isLead) {
      ...UpcomingWorkingGroupOpeningFields
    }
    workingGroupOpenings(where: { group: $group, status_json: { isTypeOf_eq: "OpeningStatusOpen" } })
      @include(if: $isLead) {
      ...WorkingGroupOpeningFields
    }
  }
  ${ElectionCandidateFieldsFragmentDoc}
  ${UpcomingWorkingGroupOpeningFieldsFragmentDoc}
  ${WorkingGroupOpeningFieldsFragmentDoc}
`

/**
 * __useGetAllDeadLinesQuery__
 *
 * To run a query within a React component, call `useGetAllDeadLinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDeadLinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDeadLinesQuery({
 *   variables: {
 *      proposalCreator: // value for 'proposalCreator'
 *      group: // value for 'group'
 *      isLead: // value for 'isLead'
 *   },
 * });
 */
export function useGetAllDeadLinesQuery(
  baseOptions: Apollo.QueryHookOptions<GetAllDeadLinesQuery, GetAllDeadLinesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllDeadLinesQuery, GetAllDeadLinesQueryVariables>(GetAllDeadLinesDocument, options)
}
export function useGetAllDeadLinesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllDeadLinesQuery, GetAllDeadLinesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllDeadLinesQuery, GetAllDeadLinesQueryVariables>(GetAllDeadLinesDocument, options)
}
export type GetAllDeadLinesQueryHookResult = ReturnType<typeof useGetAllDeadLinesQuery>
export type GetAllDeadLinesLazyQueryHookResult = ReturnType<typeof useGetAllDeadLinesLazyQuery>
export type GetAllDeadLinesQueryResult = Apollo.QueryResult<GetAllDeadLinesQuery, GetAllDeadLinesQueryVariables>
