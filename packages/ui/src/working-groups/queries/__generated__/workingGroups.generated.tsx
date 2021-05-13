import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import {
  MemberFieldsFragment,
  MemberFieldsFragmentDoc,
} from '../../../memberships/queries/__generated__/members.generated'
import { BlockFieldsFragment, BlockFieldsFragmentDoc } from '../../../common/queries/__generated__/blocks.generated'
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
  isLead: boolean
  rewardPerBlock: any
  stake: any
  membership: { __typename: 'Membership' } & MemberFieldsFragment
  group: { __typename: 'WorkingGroup'; id: string; name: string }
  status:
    | { __typename: 'WorkerStatusActive' }
    | { __typename: 'WorkerStatusLeft' }
    | { __typename: 'WorkerStatusTerminated' }
}

export type WorkingGroupFieldsFragment = {
  __typename: 'WorkingGroup'
  id: string
  name: string
  budget: any
  metadata?: Types.Maybe<{ __typename: 'WorkingGroupMetadata' } & WorkingGroupMetdataFieldsFragment>
  workers: Array<{ __typename: 'Worker' } & WorkerFieldsFragment>
  leader?: Types.Maybe<{ __typename: 'Worker'; membership: { __typename: 'Membership'; id: string } }>
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
  group: { __typename: 'WorkingGroup'; name: string; budget: any; leaderId?: Types.Maybe<string> }
  createdAtBlock: { __typename: 'Block' } & BlockFieldsFragment
  metadata: { __typename: 'WorkingGroupOpeningMetadata' } & WorkingGroupOpeningMetadataFieldsFragment
  applications: Array<{
    __typename: 'WorkingGroupApplication'
    id: string
    status:
      | { __typename: 'ApplicationStatusPending' }
      | { __typename: 'ApplicationStatusAccepted' }
      | { __typename: 'ApplicationStatusRejected' }
      | { __typename: 'ApplicationStatusWithdrawn' }
      | { __typename: 'ApplicationStatusCancelled' }
    applicant: {
      __typename: 'Membership'
      id: string
      isVerified: boolean
      handle: string
      rootAccount: string
      controllerAccount: string
      inviteCount: number
      isFoundingMember: boolean
      roles: Array<{ __typename: 'Worker'; id: string }>
      metadata: { __typename: 'MemberMetadata'; name?: Types.Maybe<string> }
    }
  }>
  status:
    | { __typename: 'OpeningStatusOpen' }
    | { __typename: 'OpeningStatusFilled' }
    | { __typename: 'OpeningStatusCancelled' }
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
    { __typename: 'WorkingGroupOpening' } & WorkingGroupOpeningFieldsFragment
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
  createdAtBlock: { __typename: 'Block' } & BlockFieldsFragment
}

export type GetWorkingGroupApplicationsQueryVariables = Types.Exact<{
  applicantId_in?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetWorkingGroupApplicationsQuery = {
  __typename: 'Query'
  workingGroupApplications: Array<{ __typename: 'WorkingGroupApplication' } & WorkingGroupApplicationFieldsFragment>
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

export const WorkingGroupMetdataFieldsFragmentDoc = gql`
  fragment WorkingGroupMetdataFields on WorkingGroupMetadata {
    about
    description
    status
    statusMessage
  }
`
export const WorkerFieldsFragmentDoc = gql`
  fragment WorkerFields on Worker {
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
    stake
  }
  ${MemberFieldsFragmentDoc}
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
      ...WorkerFields
    }
    leader {
      membership {
        id
      }
    }
  }
  ${WorkingGroupMetdataFieldsFragmentDoc}
  ${WorkerFieldsFragmentDoc}
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
    createdAtBlock {
      ...BlockFields
    }
    metadata {
      ...WorkingGroupOpeningMetadataFields
    }
    applications {
      id
      status {
        __typename
      }
      applicant {
        id
        isVerified
        handle
        rootAccount
        controllerAccount
        inviteCount
        isFoundingMember
        roles {
          id
        }
        metadata {
          name
        }
      }
      status {
        __typename
      }
    }
    status {
      __typename
    }
  }
  ${BlockFieldsFragmentDoc}
  ${WorkingGroupOpeningMetadataFieldsFragmentDoc}
`
export const WorkingGroupApplicationFieldsFragmentDoc = gql`
  fragment WorkingGroupApplicationFields on WorkingGroupApplication {
    id
    opening {
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
    createdAtBlock {
      ...BlockFields
    }
  }
  ${MemberFieldsFragmentDoc}
  ${BlockFieldsFragmentDoc}
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
export const GetWorkingGroupOpeningsDocument = gql`
  query getWorkingGroupOpenings($groupId_eq: ID) {
    workingGroupOpenings(where: { groupId_eq: $groupId_eq }) {
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
      ...WorkingGroupOpeningFields
    }
  }
  ${WorkingGroupOpeningFieldsFragmentDoc}
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
    workingGroupApplications(where: { applicantId_in: $applicantId_in }) {
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
export const GetApplicationFormQuestionAnswerDocument = gql`
  query GetApplicationFormQuestionAnswer($applicationId_eq: ID) {
    applicationFormQuestionAnswers(where: { applicationId_eq: $applicationId_eq }) {
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
