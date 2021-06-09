import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import {
  MemberFieldsFragment,
  MemberFieldsFragmentDoc,
} from '../../../memberships/queries/__generated__/members.generated'
import { gql } from '@apollo/client'

import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type WorkingGroupMetdataFieldsFragment = {
  __typename: 'WorkingGroupMetadata'
  about?: Types.Maybe<string>
  description?: Types.Maybe<string>
  status?: Types.Maybe<string>
  statusMessage?: Types.Maybe<string>
}

export type WorkerFieldsFragment = {
  __typename: 'Worker'
  id: string
  isLead: boolean
  rewardPerBlock: any
  missingRewardAmount?: Types.Maybe<any>
  stake: any
  membership: { __typename: 'Membership' } & MemberFieldsFragment
  group: { __typename: 'WorkingGroup'; id: string; name: string }
  status:
    | { __typename: 'WorkerStatusActive' }
    | { __typename: 'WorkerStatusLeft' }
    | { __typename: 'WorkerStatusTerminated' }
}

export type WorkerDetailedFieldsFragment = {
  __typename: 'Worker'
  roleAccount: string
  rewardAccount: string
  stakeAccount: string
  application: {
    __typename: 'WorkingGroupApplication'
    id: string
    openingId: string
    opening: { __typename: 'WorkingGroupOpening'; stakeAmount: any }
  }
} & WorkerFieldsFragment

export type WorkingGroupFieldsFragment = {
  __typename: 'WorkingGroup'
  id: string
  name: string
  budget: any
  metadata?: Types.Maybe<{ __typename: 'WorkingGroupMetadata' } & WorkingGroupMetdataFieldsFragment>
  workers: Array<{ __typename: 'Worker'; id: string }>
  leader?: Types.Maybe<{ __typename: 'Worker'; membership: { __typename: 'Membership'; id: string } }>
}

export type BudgetSpendingEventFieldsFragment = {
  __typename: 'BudgetSpendingEvent'
  id: string
  groupId: string
  reciever: string
  amount: any
  rationale?: Types.Maybe<string>
}

export type GetBudgetSpendingQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.BudgetSpendingEventWhereInput>
}>

export type GetBudgetSpendingQuery = {
  __typename: 'Query'
  budgetSpendingEvents: Array<{ __typename: 'BudgetSpendingEvent' } & BudgetSpendingEventFieldsFragment>
}

export type RewardPaidEventFieldsFragment = {
  __typename: 'RewardPaidEvent'
  id: string
  amount: any
  rewardAccount: string
  createdAt: any
}

export type GetWorkingGroupsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetWorkingGroupsQuery = {
  __typename: 'Query'
  workingGroups: Array<{ __typename: 'WorkingGroup' } & WorkingGroupFieldsFragment>
}

export type GetWorkersQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>
}>

export type GetWorkersQuery = { __typename: 'Query'; workers: Array<{ __typename: 'Worker' } & WorkerFieldsFragment> }

export type GetDetailedWorkersQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>
}>

export type GetDetailedWorkersQuery = {
  __typename: 'Query'
  workers: Array<{ __typename: 'Worker' } & WorkerDetailedFieldsFragment>
}

export type GetWorkerQueryVariables = Types.Exact<{
  where: Types.WorkerWhereUniqueInput
}>

export type GetWorkerQuery = {
  __typename: 'Query'
  workerByUniqueInput?: Types.Maybe<{ __typename: 'Worker' } & WorkerDetailedFieldsFragment>
}

export type GetRewardsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.RewardPaidEventWhereInput>
}>

export type GetRewardsQuery = {
  __typename: 'Query'
  rewardPaidEvents: Array<{ __typename: 'RewardPaidEvent' } & RewardPaidEventFieldsFragment>
}

export type WorkingGroupOpeningMetadataFieldsFragment = {
  __typename: 'WorkingGroupOpeningMetadata'
  applicationDetails?: Types.Maybe<string>
  shortDescription?: Types.Maybe<string>
  description?: Types.Maybe<string>
  hiringLimit?: Types.Maybe<number>
  expectedEnding?: Types.Maybe<any>
}

export type WorkingGroupOpeningFieldsFragment = {
  __typename: 'WorkingGroupOpening'
  id: string
  groupId: string
  type: Types.WorkingGroupOpeningType
  stakeAmount: any
  rewardPerBlock: any
  unstakingPeriod: number
  group: { __typename: 'WorkingGroup'; name: string; budget: any; leaderId?: Types.Maybe<string> }
  metadata: { __typename: 'WorkingGroupOpeningMetadata' } & WorkingGroupOpeningMetadataFieldsFragment
  status:
    | { __typename: 'OpeningStatusOpen' }
    | { __typename: 'OpeningStatusFilled' }
    | { __typename: 'OpeningStatusCancelled' }
  applications: Array<{ __typename: 'WorkingGroupApplication'; id: string }>
}

export type WorkingGroupOpeningDetailedFieldsFragment = {
  __typename: 'WorkingGroupOpening'
  applications: Array<{
    __typename: 'WorkingGroupApplication'
    id: string
    status:
      | { __typename: 'ApplicationStatusPending' }
      | { __typename: 'ApplicationStatusAccepted' }
      | { __typename: 'ApplicationStatusRejected' }
      | { __typename: 'ApplicationStatusWithdrawn' }
      | { __typename: 'ApplicationStatusCancelled' }
    applicant: { __typename: 'Membership' } & MemberFieldsFragment
  }>
} & WorkingGroupOpeningFieldsFragment

export type WorkingGroupOpeningFieldsConnectionFragment = {
  __typename: 'WorkingGroupOpeningConnection'
  totalCount: number
  edges: Array<{
    __typename: 'WorkingGroupOpeningEdge'
    cursor: string
    node: { __typename: 'WorkingGroupOpening' } & WorkingGroupOpeningFieldsFragment
  }>
  pageInfo: {
    __typename: 'PageInfo'
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor?: Types.Maybe<string>
    endCursor?: Types.Maybe<string>
  }
}

export type GetWorkingGroupOpeningsConnectionQueryVariables = Types.Exact<{
  groupId_eq?: Types.Maybe<Types.Scalars['ID']>
  status_json?: Types.Maybe<Types.Scalars['JSONObject']>
  first?: Types.Maybe<Types.Scalars['Int']>
  last?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetWorkingGroupOpeningsConnectionQuery = {
  __typename: 'Query'
  workingGroupOpeningsConnection: {
    __typename: 'WorkingGroupOpeningConnection'
  } & WorkingGroupOpeningFieldsConnectionFragment
}

export type GetWorkingGroupOpeningsQueryVariables = Types.Exact<{
  groupId_eq?: Types.Maybe<Types.Scalars['ID']>
}>

export type GetWorkingGroupOpeningsQuery = {
  __typename: 'Query'
  workingGroupOpenings: Array<{ __typename: 'WorkingGroupOpening' } & WorkingGroupOpeningFieldsFragment>
}

export type GetWorkingGroupOpeningQueryVariables = Types.Exact<{
  where: Types.WorkingGroupOpeningWhereUniqueInput
}>

export type GetWorkingGroupOpeningQuery = {
  __typename: 'Query'
  workingGroupOpeningByUniqueInput?: Types.Maybe<
    { __typename: 'WorkingGroupOpening' } & WorkingGroupOpeningDetailedFieldsFragment
  >
}

export type ApplicationQuestionFieldsFragment = {
  __typename: 'ApplicationFormQuestion'
  index: number
  type: Types.ApplicationFormQuestionType
  question?: Types.Maybe<string>
}

export type GetWorkingGroupOpeningQuestionsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetWorkingGroupOpeningQuestionsQuery = {
  __typename: 'Query'
  workingGroupOpeningByUniqueInput?: Types.Maybe<{
    __typename: 'WorkingGroupOpening'
    metadata: {
      __typename: 'WorkingGroupOpeningMetadata'
      applicationFormQuestions: Array<{ __typename: 'ApplicationFormQuestion' } & ApplicationQuestionFieldsFragment>
    }
  }>
}

export type GetWorkingGroupQueryVariables = Types.Exact<{
  where: Types.WorkingGroupWhereUniqueInput
}>

export type GetWorkingGroupQuery = {
  __typename: 'Query'
  workingGroupByUniqueInput?: Types.Maybe<{ __typename: 'WorkingGroup' } & WorkingGroupFieldsFragment>
}

export type WorkingGroupApplicationFieldsFragment = {
  __typename: 'WorkingGroupApplication'
  id: string
  stakingAccount: string
  opening: {
    __typename: 'WorkingGroupOpening'
    id: string
    type: Types.WorkingGroupOpeningType
    rewardPerBlock: any
    group: { __typename: 'WorkingGroup'; name: string }
  }
  applicant: { __typename: 'Membership' } & MemberFieldsFragment
  status:
    | { __typename: 'ApplicationStatusPending' }
    | { __typename: 'ApplicationStatusAccepted' }
    | { __typename: 'ApplicationStatusRejected' }
    | { __typename: 'ApplicationStatusWithdrawn' }
    | { __typename: 'ApplicationStatusCancelled' }
}

export type GetWorkingGroupApplicationsQueryVariables = Types.Exact<{
  applicantId_in?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetWorkingGroupApplicationsQuery = {
  __typename: 'Query'
  workingGroupApplications: Array<{ __typename: 'WorkingGroupApplication' } & WorkingGroupApplicationFieldsFragment>
}

export type GetWorkingGroupApplicationQueryVariables = Types.Exact<{
  where: Types.WorkingGroupApplicationWhereUniqueInput
}>

export type GetWorkingGroupApplicationQuery = {
  __typename: 'Query'
  workingGroupApplicationByUniqueInput?: Types.Maybe<
    { __typename: 'WorkingGroupApplication' } & WorkingGroupApplicationFieldsFragment
  >
}

export type ApplicationFormQuestionAnswerFieldsFragment = {
  __typename: 'ApplicationFormQuestionAnswer'
  answer: string
  question: { __typename: 'ApplicationFormQuestion' } & ApplicationQuestionFieldsFragment
}

export type GetApplicationFormQuestionAnswerQueryVariables = Types.Exact<{
  applicationId_eq?: Types.Maybe<Types.Scalars['ID']>
}>

export type GetApplicationFormQuestionAnswerQuery = {
  __typename: 'Query'
  applicationFormQuestionAnswers: Array<
    { __typename: 'ApplicationFormQuestionAnswer' } & ApplicationFormQuestionAnswerFieldsFragment
  >
}

export type UpcomingWorkingGroupOpeningFieldsFragment = {
  __typename: 'UpcomingWorkingGroupOpening'
  id: string
  groupId: string
  expectedStart?: Types.Maybe<any>
  stakeAmount?: Types.Maybe<any>
  rewardPerBlock?: Types.Maybe<any>
  group: { __typename: 'WorkingGroup'; name: string; budget: any; leaderId?: Types.Maybe<string> }
  metadata: { __typename: 'WorkingGroupOpeningMetadata' } & WorkingGroupOpeningMetadataFieldsFragment
}

export type GetUpcomingWorkingGroupOpeningQueryVariables = Types.Exact<{
  where: Types.UpcomingWorkingGroupOpeningWhereUniqueInput
}>

export type GetUpcomingWorkingGroupOpeningQuery = {
  __typename: 'Query'
  upcomingWorkingGroupOpeningByUniqueInput?: Types.Maybe<
    { __typename: 'UpcomingWorkingGroupOpening' } & UpcomingWorkingGroupOpeningFieldsFragment
  >
}

export type GetUpcomingWorkingGroupOpeningsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.UpcomingWorkingGroupOpeningWhereInput>
  limit?: Types.Maybe<Types.Scalars['Int']>
  offset?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetUpcomingWorkingGroupOpeningsQuery = {
  __typename: 'Query'
  upcomingWorkingGroupOpenings: Array<
    { __typename: 'UpcomingWorkingGroupOpening' } & UpcomingWorkingGroupOpeningFieldsFragment
  >
}

export const WorkerFieldsFragmentDoc = gql`
  fragment WorkerFields on Worker {
    id
    membership {
      ...MemberFields
    }
    group {
      id
      name
    }
    status {
      __typename
    }
    isLead
    rewardPerBlock
    missingRewardAmount
    stake
  }
  ${MemberFieldsFragmentDoc}
`
export const WorkerDetailedFieldsFragmentDoc = gql`
  fragment WorkerDetailedFields on Worker {
    ...WorkerFields
    roleAccount
    rewardAccount
    stakeAccount
    application {
      id
      openingId
      opening {
        stakeAmount
      }
    }
  }
  ${WorkerFieldsFragmentDoc}
`
export const WorkingGroupMetdataFieldsFragmentDoc = gql`
  fragment WorkingGroupMetdataFields on WorkingGroupMetadata {
    about
    description
    status
    statusMessage
  }
`
export const WorkingGroupFieldsFragmentDoc = gql`
  fragment WorkingGroupFields on WorkingGroup {
    id
    name
    budget
    metadata {
      ...WorkingGroupMetdataFields
    }
    workers {
      id
    }
    leader {
      membership {
        id
      }
    }
  }
  ${WorkingGroupMetdataFieldsFragmentDoc}
`
export const BudgetSpendingEventFieldsFragmentDoc = gql`
  fragment BudgetSpendingEventFields on BudgetSpendingEvent {
    id
    groupId
    reciever
    amount
    rationale
  }
`
export const RewardPaidEventFieldsFragmentDoc = gql`
  fragment RewardPaidEventFields on RewardPaidEvent {
    id
    amount
    rewardAccount
    createdAt
  }
`
export const WorkingGroupOpeningMetadataFieldsFragmentDoc = gql`
  fragment WorkingGroupOpeningMetadataFields on WorkingGroupOpeningMetadata {
    applicationDetails
    shortDescription
    description
    hiringLimit
    expectedEnding
  }
`
export const WorkingGroupOpeningFieldsFragmentDoc = gql`
  fragment WorkingGroupOpeningFields on WorkingGroupOpening {
    id
    groupId
    group {
      name
      budget
      leaderId
    }
    type
    stakeAmount
    rewardPerBlock
    metadata {
      ...WorkingGroupOpeningMetadataFields
    }
    status {
      __typename
    }
    unstakingPeriod
    applications {
      id
    }
  }
  ${WorkingGroupOpeningMetadataFieldsFragmentDoc}
`
export const WorkingGroupOpeningDetailedFieldsFragmentDoc = gql`
  fragment WorkingGroupOpeningDetailedFields on WorkingGroupOpening {
    ...WorkingGroupOpeningFields
    applications {
      id
      status {
        __typename
      }
      applicant {
        ...MemberFields
      }
      status {
        __typename
      }
    }
  }
  ${WorkingGroupOpeningFieldsFragmentDoc}
  ${MemberFieldsFragmentDoc}
`
export const WorkingGroupOpeningFieldsConnectionFragmentDoc = gql`
  fragment WorkingGroupOpeningFieldsConnection on WorkingGroupOpeningConnection {
    totalCount
    edges {
      node {
        ...WorkingGroupOpeningFields
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
  ${WorkingGroupOpeningFieldsFragmentDoc}
`
export const WorkingGroupApplicationFieldsFragmentDoc = gql`
  fragment WorkingGroupApplicationFields on WorkingGroupApplication {
    id
    opening {
      id
      group {
        name
      }
      type
      rewardPerBlock
    }
    applicant {
      ...MemberFields
    }
    status {
      __typename
    }
    stakingAccount
  }
  ${MemberFieldsFragmentDoc}
`
export const ApplicationQuestionFieldsFragmentDoc = gql`
  fragment ApplicationQuestionFields on ApplicationFormQuestion {
    index
    type
    question
  }
`
export const ApplicationFormQuestionAnswerFieldsFragmentDoc = gql`
  fragment ApplicationFormQuestionAnswerFields on ApplicationFormQuestionAnswer {
    question {
      ...ApplicationQuestionFields
    }
    answer
  }
  ${ApplicationQuestionFieldsFragmentDoc}
`
export const UpcomingWorkingGroupOpeningFieldsFragmentDoc = gql`
  fragment UpcomingWorkingGroupOpeningFields on UpcomingWorkingGroupOpening {
    id
    groupId
    group {
      name
      budget
      leaderId
    }
    expectedStart
    stakeAmount
    rewardPerBlock
    metadata {
      ...WorkingGroupOpeningMetadataFields
    }
  }
  ${WorkingGroupOpeningMetadataFieldsFragmentDoc}
`
export const GetBudgetSpendingDocument = gql`
  query getBudgetSpending($where: BudgetSpendingEventWhereInput) {
    budgetSpendingEvents(where: $where) {
      ...BudgetSpendingEventFields
    }
  }
  ${BudgetSpendingEventFieldsFragmentDoc}
`

/**
 * __useGetBudgetSpendingQuery__
 *
 * To run a query within a React component, call `useGetBudgetSpendingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetSpendingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetSpendingQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBudgetSpendingQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(GetBudgetSpendingDocument, options)
}
export function useGetBudgetSpendingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(
    GetBudgetSpendingDocument,
    options
  )
}
export type GetBudgetSpendingQueryHookResult = ReturnType<typeof useGetBudgetSpendingQuery>
export type GetBudgetSpendingLazyQueryHookResult = ReturnType<typeof useGetBudgetSpendingLazyQuery>
export type GetBudgetSpendingQueryResult = Apollo.QueryResult<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>
export const GetWorkingGroupsDocument = gql`
  query getWorkingGroups {
    workingGroups {
      ...WorkingGroupFields
    }
  }
  ${WorkingGroupFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkingGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options)
}
export function useGetWorkingGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options)
}
export type GetWorkingGroupsQueryHookResult = ReturnType<typeof useGetWorkingGroupsQuery>
export type GetWorkingGroupsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupsLazyQuery>
export type GetWorkingGroupsQueryResult = Apollo.QueryResult<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>
export const GetWorkersDocument = gql`
  query getWorkers($where: WorkerWhereInput) {
    workers(where: $where) {
      ...WorkerFields
    }
  }
  ${WorkerFieldsFragmentDoc}
`

/**
 * __useGetWorkersQuery__
 *
 * To run a query within a React component, call `useGetWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkersQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options)
}
export function useGetWorkersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options)
}
export type GetWorkersQueryHookResult = ReturnType<typeof useGetWorkersQuery>
export type GetWorkersLazyQueryHookResult = ReturnType<typeof useGetWorkersLazyQuery>
export type GetWorkersQueryResult = Apollo.QueryResult<GetWorkersQuery, GetWorkersQueryVariables>
export const GetDetailedWorkersDocument = gql`
  query getDetailedWorkers($where: WorkerWhereInput) {
    workers(where: $where) {
      ...WorkerDetailedFields
    }
  }
  ${WorkerDetailedFieldsFragmentDoc}
`

/**
 * __useGetDetailedWorkersQuery__
 *
 * To run a query within a React component, call `useGetDetailedWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDetailedWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDetailedWorkersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetDetailedWorkersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>(GetDetailedWorkersDocument, options)
}
export function useGetDetailedWorkersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>(
    GetDetailedWorkersDocument,
    options
  )
}
export type GetDetailedWorkersQueryHookResult = ReturnType<typeof useGetDetailedWorkersQuery>
export type GetDetailedWorkersLazyQueryHookResult = ReturnType<typeof useGetDetailedWorkersLazyQuery>
export type GetDetailedWorkersQueryResult = Apollo.QueryResult<
  GetDetailedWorkersQuery,
  GetDetailedWorkersQueryVariables
>
export const GetWorkerDocument = gql`
  query getWorker($where: WorkerWhereUniqueInput!) {
    workerByUniqueInput(where: $where) {
      ...WorkerDetailedFields
    }
  }
  ${WorkerDetailedFieldsFragmentDoc}
`

/**
 * __useGetWorkerQuery__
 *
 * To run a query within a React component, call `useGetWorkerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkerQuery(baseOptions: Apollo.QueryHookOptions<GetWorkerQuery, GetWorkerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkerQuery, GetWorkerQueryVariables>(GetWorkerDocument, options)
}
export function useGetWorkerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerQuery, GetWorkerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkerQuery, GetWorkerQueryVariables>(GetWorkerDocument, options)
}
export type GetWorkerQueryHookResult = ReturnType<typeof useGetWorkerQuery>
export type GetWorkerLazyQueryHookResult = ReturnType<typeof useGetWorkerLazyQuery>
export type GetWorkerQueryResult = Apollo.QueryResult<GetWorkerQuery, GetWorkerQueryVariables>
export const GetRewardsDocument = gql`
  query getRewards($where: RewardPaidEventWhereInput) {
    rewardPaidEvents(where: $where) {
      ...RewardPaidEventFields
    }
  }
  ${RewardPaidEventFieldsFragmentDoc}
`

/**
 * __useGetRewardsQuery__
 *
 * To run a query within a React component, call `useGetRewardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRewardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRewardsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetRewardsQuery(baseOptions?: Apollo.QueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options)
}
export function useGetRewardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options)
}
export type GetRewardsQueryHookResult = ReturnType<typeof useGetRewardsQuery>
export type GetRewardsLazyQueryHookResult = ReturnType<typeof useGetRewardsLazyQuery>
export type GetRewardsQueryResult = Apollo.QueryResult<GetRewardsQuery, GetRewardsQueryVariables>
export const GetWorkingGroupOpeningsConnectionDocument = gql`
  query getWorkingGroupOpeningsConnection($groupId_eq: ID, $status_json: JSONObject, $first: Int, $last: Int) {
    workingGroupOpeningsConnection(
      where: { group_eq: $groupId_eq, status_json: $status_json }
      first: $first
      last: $last
    ) {
      ...WorkingGroupOpeningFieldsConnection
    }
  }
  ${WorkingGroupOpeningFieldsConnectionFragmentDoc}
`

/**
 * __useGetWorkingGroupOpeningsConnectionQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupOpeningsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupOpeningsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupOpeningsConnectionQuery({
 *   variables: {
 *      groupId_eq: // value for 'groupId_eq'
 *      status_json: // value for 'status_json'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useGetWorkingGroupOpeningsConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetWorkingGroupOpeningsConnectionQuery,
    GetWorkingGroupOpeningsConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupOpeningsConnectionQuery, GetWorkingGroupOpeningsConnectionQueryVariables>(
    GetWorkingGroupOpeningsConnectionDocument,
    options
  )
}
export function useGetWorkingGroupOpeningsConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkingGroupOpeningsConnectionQuery,
    GetWorkingGroupOpeningsConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupOpeningsConnectionQuery, GetWorkingGroupOpeningsConnectionQueryVariables>(
    GetWorkingGroupOpeningsConnectionDocument,
    options
  )
}
export type GetWorkingGroupOpeningsConnectionQueryHookResult = ReturnType<
  typeof useGetWorkingGroupOpeningsConnectionQuery
>
export type GetWorkingGroupOpeningsConnectionLazyQueryHookResult = ReturnType<
  typeof useGetWorkingGroupOpeningsConnectionLazyQuery
>
export type GetWorkingGroupOpeningsConnectionQueryResult = Apollo.QueryResult<
  GetWorkingGroupOpeningsConnectionQuery,
  GetWorkingGroupOpeningsConnectionQueryVariables
>
export const GetWorkingGroupOpeningsDocument = gql`
  query getWorkingGroupOpenings($groupId_eq: ID) {
    workingGroupOpenings(where: { group_eq: $groupId_eq }) {
      ...WorkingGroupOpeningFields
    }
  }
  ${WorkingGroupOpeningFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupOpeningsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupOpeningsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupOpeningsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupOpeningsQuery({
 *   variables: {
 *      groupId_eq: // value for 'groupId_eq'
 *   },
 * });
 */
export function useGetWorkingGroupOpeningsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>(
    GetWorkingGroupOpeningsDocument,
    options
  )
}
export function useGetWorkingGroupOpeningsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>(
    GetWorkingGroupOpeningsDocument,
    options
  )
}
export type GetWorkingGroupOpeningsQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningsQuery>
export type GetWorkingGroupOpeningsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningsLazyQuery>
export type GetWorkingGroupOpeningsQueryResult = Apollo.QueryResult<
  GetWorkingGroupOpeningsQuery,
  GetWorkingGroupOpeningsQueryVariables
>
export const GetWorkingGroupOpeningDocument = gql`
  query getWorkingGroupOpening($where: WorkingGroupOpeningWhereUniqueInput!) {
    workingGroupOpeningByUniqueInput(where: $where) {
      ...WorkingGroupOpeningDetailedFields
    }
  }
  ${WorkingGroupOpeningDetailedFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupOpeningQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupOpeningQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupOpeningQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupOpeningQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkingGroupOpeningQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>(
    GetWorkingGroupOpeningDocument,
    options
  )
}
export function useGetWorkingGroupOpeningLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>(
    GetWorkingGroupOpeningDocument,
    options
  )
}
export type GetWorkingGroupOpeningQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningQuery>
export type GetWorkingGroupOpeningLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningLazyQuery>
export type GetWorkingGroupOpeningQueryResult = Apollo.QueryResult<
  GetWorkingGroupOpeningQuery,
  GetWorkingGroupOpeningQueryVariables
>
export const GetWorkingGroupOpeningQuestionsDocument = gql`
  query GetWorkingGroupOpeningQuestions($id: ID!) {
    workingGroupOpeningByUniqueInput(where: { id: $id }) {
      metadata {
        applicationFormQuestions {
          ...ApplicationQuestionFields
        }
      }
    }
  }
  ${ApplicationQuestionFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupOpeningQuestionsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupOpeningQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupOpeningQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupOpeningQuestionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWorkingGroupOpeningQuestionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWorkingGroupOpeningQuestionsQuery,
    GetWorkingGroupOpeningQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>(
    GetWorkingGroupOpeningQuestionsDocument,
    options
  )
}
export function useGetWorkingGroupOpeningQuestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkingGroupOpeningQuestionsQuery,
    GetWorkingGroupOpeningQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>(
    GetWorkingGroupOpeningQuestionsDocument,
    options
  )
}
export type GetWorkingGroupOpeningQuestionsQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningQuestionsQuery>
export type GetWorkingGroupOpeningQuestionsLazyQueryHookResult = ReturnType<
  typeof useGetWorkingGroupOpeningQuestionsLazyQuery
>
export type GetWorkingGroupOpeningQuestionsQueryResult = Apollo.QueryResult<
  GetWorkingGroupOpeningQuestionsQuery,
  GetWorkingGroupOpeningQuestionsQueryVariables
>
export const GetWorkingGroupDocument = gql`
  query GetWorkingGroup($where: WorkingGroupWhereUniqueInput!) {
    workingGroupByUniqueInput(where: $where) {
      ...WorkingGroupFields
    }
  }
  ${WorkingGroupFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkingGroupQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>(GetWorkingGroupDocument, options)
}
export function useGetWorkingGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>(GetWorkingGroupDocument, options)
}
export type GetWorkingGroupQueryHookResult = ReturnType<typeof useGetWorkingGroupQuery>
export type GetWorkingGroupLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupLazyQuery>
export type GetWorkingGroupQueryResult = Apollo.QueryResult<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>
export const GetWorkingGroupApplicationsDocument = gql`
  query GetWorkingGroupApplications($applicantId_in: [ID!]) {
    workingGroupApplications(where: { applicant_in: $applicantId_in }) {
      ...WorkingGroupApplicationFields
    }
  }
  ${WorkingGroupApplicationFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupApplicationsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupApplicationsQuery({
 *   variables: {
 *      applicantId_in: // value for 'applicantId_in'
 *   },
 * });
 */
export function useGetWorkingGroupApplicationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>(
    GetWorkingGroupApplicationsDocument,
    options
  )
}
export function useGetWorkingGroupApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>(
    GetWorkingGroupApplicationsDocument,
    options
  )
}
export type GetWorkingGroupApplicationsQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationsQuery>
export type GetWorkingGroupApplicationsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationsLazyQuery>
export type GetWorkingGroupApplicationsQueryResult = Apollo.QueryResult<
  GetWorkingGroupApplicationsQuery,
  GetWorkingGroupApplicationsQueryVariables
>
export const GetWorkingGroupApplicationDocument = gql`
  query GetWorkingGroupApplication($where: WorkingGroupApplicationWhereUniqueInput!) {
    workingGroupApplicationByUniqueInput(where: $where) {
      ...WorkingGroupApplicationFields
    }
  }
  ${WorkingGroupApplicationFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupApplicationQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupApplicationQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkingGroupApplicationQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>(
    GetWorkingGroupApplicationDocument,
    options
  )
}
export function useGetWorkingGroupApplicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>(
    GetWorkingGroupApplicationDocument,
    options
  )
}
export type GetWorkingGroupApplicationQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationQuery>
export type GetWorkingGroupApplicationLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationLazyQuery>
export type GetWorkingGroupApplicationQueryResult = Apollo.QueryResult<
  GetWorkingGroupApplicationQuery,
  GetWorkingGroupApplicationQueryVariables
>
export const GetApplicationFormQuestionAnswerDocument = gql`
  query GetApplicationFormQuestionAnswer($applicationId_eq: ID) {
    applicationFormQuestionAnswers(where: { application_eq: $applicationId_eq }) {
      ...ApplicationFormQuestionAnswerFields
    }
  }
  ${ApplicationFormQuestionAnswerFieldsFragmentDoc}
`

/**
 * __useGetApplicationFormQuestionAnswerQuery__
 *
 * To run a query within a React component, call `useGetApplicationFormQuestionAnswerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicationFormQuestionAnswerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicationFormQuestionAnswerQuery({
 *   variables: {
 *      applicationId_eq: // value for 'applicationId_eq'
 *   },
 * });
 */
export function useGetApplicationFormQuestionAnswerQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetApplicationFormQuestionAnswerQuery,
    GetApplicationFormQuestionAnswerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>(
    GetApplicationFormQuestionAnswerDocument,
    options
  )
}
export function useGetApplicationFormQuestionAnswerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApplicationFormQuestionAnswerQuery,
    GetApplicationFormQuestionAnswerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>(
    GetApplicationFormQuestionAnswerDocument,
    options
  )
}
export type GetApplicationFormQuestionAnswerQueryHookResult = ReturnType<
  typeof useGetApplicationFormQuestionAnswerQuery
>
export type GetApplicationFormQuestionAnswerLazyQueryHookResult = ReturnType<
  typeof useGetApplicationFormQuestionAnswerLazyQuery
>
export type GetApplicationFormQuestionAnswerQueryResult = Apollo.QueryResult<
  GetApplicationFormQuestionAnswerQuery,
  GetApplicationFormQuestionAnswerQueryVariables
>
export const GetUpcomingWorkingGroupOpeningDocument = gql`
  query GetUpcomingWorkingGroupOpening($where: UpcomingWorkingGroupOpeningWhereUniqueInput!) {
    upcomingWorkingGroupOpeningByUniqueInput(where: $where) {
      ...UpcomingWorkingGroupOpeningFields
    }
  }
  ${UpcomingWorkingGroupOpeningFieldsFragmentDoc}
`

/**
 * __useGetUpcomingWorkingGroupOpeningQuery__
 *
 * To run a query within a React component, call `useGetUpcomingWorkingGroupOpeningQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingWorkingGroupOpeningQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingWorkingGroupOpeningQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUpcomingWorkingGroupOpeningQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUpcomingWorkingGroupOpeningQuery,
    GetUpcomingWorkingGroupOpeningQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>(
    GetUpcomingWorkingGroupOpeningDocument,
    options
  )
}
export function useGetUpcomingWorkingGroupOpeningLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUpcomingWorkingGroupOpeningQuery,
    GetUpcomingWorkingGroupOpeningQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>(
    GetUpcomingWorkingGroupOpeningDocument,
    options
  )
}
export type GetUpcomingWorkingGroupOpeningQueryHookResult = ReturnType<typeof useGetUpcomingWorkingGroupOpeningQuery>
export type GetUpcomingWorkingGroupOpeningLazyQueryHookResult = ReturnType<
  typeof useGetUpcomingWorkingGroupOpeningLazyQuery
>
export type GetUpcomingWorkingGroupOpeningQueryResult = Apollo.QueryResult<
  GetUpcomingWorkingGroupOpeningQuery,
  GetUpcomingWorkingGroupOpeningQueryVariables
>
export const GetUpcomingWorkingGroupOpeningsDocument = gql`
  query GetUpcomingWorkingGroupOpenings($where: UpcomingWorkingGroupOpeningWhereInput, $limit: Int, $offset: Int) {
    upcomingWorkingGroupOpenings(where: $where, limit: $limit, offset: $offset) {
      ...UpcomingWorkingGroupOpeningFields
    }
  }
  ${UpcomingWorkingGroupOpeningFieldsFragmentDoc}
`

/**
 * __useGetUpcomingWorkingGroupOpeningsQuery__
 *
 * To run a query within a React component, call `useGetUpcomingWorkingGroupOpeningsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingWorkingGroupOpeningsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingWorkingGroupOpeningsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUpcomingWorkingGroupOpeningsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUpcomingWorkingGroupOpeningsQuery,
    GetUpcomingWorkingGroupOpeningsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>(
    GetUpcomingWorkingGroupOpeningsDocument,
    options
  )
}
export function useGetUpcomingWorkingGroupOpeningsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUpcomingWorkingGroupOpeningsQuery,
    GetUpcomingWorkingGroupOpeningsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>(
    GetUpcomingWorkingGroupOpeningsDocument,
    options
  )
}
export type GetUpcomingWorkingGroupOpeningsQueryHookResult = ReturnType<typeof useGetUpcomingWorkingGroupOpeningsQuery>
export type GetUpcomingWorkingGroupOpeningsLazyQueryHookResult = ReturnType<
  typeof useGetUpcomingWorkingGroupOpeningsLazyQuery
>
export type GetUpcomingWorkingGroupOpeningsQueryResult = Apollo.QueryResult<
  GetUpcomingWorkingGroupOpeningsQuery,
  GetUpcomingWorkingGroupOpeningsQueryVariables
>
