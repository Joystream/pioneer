import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetBackendMemberExistsQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type GetBackendMemberExistsQuery = { __typename: 'Query'; memberExist?: boolean | null }

export type GetBackendMeQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetBackendMeQuery = {
  __typename: 'Query'
  me?: {
    __typename: 'Member'
    id: number
    name: string
    email?: string | null
    unverifiedEmail?: string | null
    receiveEmails: boolean
  } | null
}

export type RegisterBackendMemberMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  name: Types.Scalars['String']
  email: Types.Scalars['String']
  signature: Types.Scalars['String']
  timestamp: Types.Scalars['BigInt']
}>

export type RegisterBackendMemberMutation = { __typename: 'Mutation'; signup?: string | null }

export type ConfirmBackendEmailMutationVariables = Types.Exact<{
  token: Types.Scalars['String']
}>

export type ConfirmBackendEmailMutation = {
  __typename: 'Mutation'
  verifyEmail?: { __typename: 'Member'; email?: string | null } | null
}

export type UpdateBackendMemberMutationVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>
  receiveEmails?: Types.InputMaybe<Types.Scalars['Boolean']>
}>

export type UpdateBackendMemberMutation = {
  __typename: 'Mutation'
  updateMember?: {
    __typename: 'Member'
    id: number
    name: string
    email?: string | null
    unverifiedEmail?: string | null
    receiveEmails: boolean
  } | null
}

export type BackendSigninMutationVariables = Types.Exact<{
  memberId: Types.Scalars['Int']
  signature: Types.Scalars['String']
  timestamp: Types.Scalars['BigInt']
}>

export type BackendSigninMutation = { __typename: 'Mutation'; signin?: string | null }

export const GetBackendMemberExistsDocument = gql`
  query GetBackendMemberExists($id: Int!) {
    memberExist(id: $id)
  }
`

/**
 * __useGetBackendMemberExistsQuery__
 *
 * To run a query within a React component, call `useGetBackendMemberExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBackendMemberExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBackendMemberExistsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBackendMemberExistsQuery(
  baseOptions: Apollo.QueryHookOptions<GetBackendMemberExistsQuery, GetBackendMemberExistsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBackendMemberExistsQuery, GetBackendMemberExistsQueryVariables>(
    GetBackendMemberExistsDocument,
    options
  )
}
export function useGetBackendMemberExistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBackendMemberExistsQuery, GetBackendMemberExistsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBackendMemberExistsQuery, GetBackendMemberExistsQueryVariables>(
    GetBackendMemberExistsDocument,
    options
  )
}
export type GetBackendMemberExistsQueryHookResult = ReturnType<typeof useGetBackendMemberExistsQuery>
export type GetBackendMemberExistsLazyQueryHookResult = ReturnType<typeof useGetBackendMemberExistsLazyQuery>
export type GetBackendMemberExistsQueryResult = Apollo.QueryResult<
  GetBackendMemberExistsQuery,
  GetBackendMemberExistsQueryVariables
>
export const GetBackendMeDocument = gql`
  query GetBackendMe {
    me {
      id
      name
      email
      unverifiedEmail
      receiveEmails
    }
  }
`

/**
 * __useGetBackendMeQuery__
 *
 * To run a query within a React component, call `useGetBackendMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBackendMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBackendMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBackendMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBackendMeQuery, GetBackendMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBackendMeQuery, GetBackendMeQueryVariables>(GetBackendMeDocument, options)
}
export function useGetBackendMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBackendMeQuery, GetBackendMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBackendMeQuery, GetBackendMeQueryVariables>(GetBackendMeDocument, options)
}
export type GetBackendMeQueryHookResult = ReturnType<typeof useGetBackendMeQuery>
export type GetBackendMeLazyQueryHookResult = ReturnType<typeof useGetBackendMeLazyQuery>
export type GetBackendMeQueryResult = Apollo.QueryResult<GetBackendMeQuery, GetBackendMeQueryVariables>
export const RegisterBackendMemberDocument = gql`
  mutation RegisterBackendMember($id: Int!, $name: String!, $email: String!, $signature: String!, $timestamp: BigInt!) {
    signup(memberId: $id, name: $name, email: $email, signature: $signature, timestamp: $timestamp)
  }
`
export type RegisterBackendMemberMutationFn = Apollo.MutationFunction<
  RegisterBackendMemberMutation,
  RegisterBackendMemberMutationVariables
>

/**
 * __useRegisterBackendMemberMutation__
 *
 * To run a mutation, you first call `useRegisterBackendMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterBackendMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerBackendMemberMutation, { data, loading, error }] = useRegisterBackendMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      signature: // value for 'signature'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useRegisterBackendMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterBackendMemberMutation, RegisterBackendMemberMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterBackendMemberMutation, RegisterBackendMemberMutationVariables>(
    RegisterBackendMemberDocument,
    options
  )
}
export type RegisterBackendMemberMutationHookResult = ReturnType<typeof useRegisterBackendMemberMutation>
export type RegisterBackendMemberMutationResult = Apollo.MutationResult<RegisterBackendMemberMutation>
export type RegisterBackendMemberMutationOptions = Apollo.BaseMutationOptions<
  RegisterBackendMemberMutation,
  RegisterBackendMemberMutationVariables
>
export const ConfirmBackendEmailDocument = gql`
  mutation ConfirmBackendEmail($token: String!) {
    verifyEmail(token: $token) {
      email
    }
  }
`
export type ConfirmBackendEmailMutationFn = Apollo.MutationFunction<
  ConfirmBackendEmailMutation,
  ConfirmBackendEmailMutationVariables
>

/**
 * __useConfirmBackendEmailMutation__
 *
 * To run a mutation, you first call `useConfirmBackendEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmBackendEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmBackendEmailMutation, { data, loading, error }] = useConfirmBackendEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmBackendEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<ConfirmBackendEmailMutation, ConfirmBackendEmailMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ConfirmBackendEmailMutation, ConfirmBackendEmailMutationVariables>(
    ConfirmBackendEmailDocument,
    options
  )
}
export type ConfirmBackendEmailMutationHookResult = ReturnType<typeof useConfirmBackendEmailMutation>
export type ConfirmBackendEmailMutationResult = Apollo.MutationResult<ConfirmBackendEmailMutation>
export type ConfirmBackendEmailMutationOptions = Apollo.BaseMutationOptions<
  ConfirmBackendEmailMutation,
  ConfirmBackendEmailMutationVariables
>
export const UpdateBackendMemberDocument = gql`
  mutation UpdateBackendMember($email: String, $receiveEmails: Boolean) {
    updateMember(email: $email, receiveEmails: $receiveEmails) {
      id
      name
      email
      unverifiedEmail
      receiveEmails
    }
  }
`
export type UpdateBackendMemberMutationFn = Apollo.MutationFunction<
  UpdateBackendMemberMutation,
  UpdateBackendMemberMutationVariables
>

/**
 * __useUpdateBackendMemberMutation__
 *
 * To run a mutation, you first call `useUpdateBackendMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBackendMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBackendMemberMutation, { data, loading, error }] = useUpdateBackendMemberMutation({
 *   variables: {
 *      email: // value for 'email'
 *      receiveEmails: // value for 'receiveEmails'
 *   },
 * });
 */
export function useUpdateBackendMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBackendMemberMutation, UpdateBackendMemberMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateBackendMemberMutation, UpdateBackendMemberMutationVariables>(
    UpdateBackendMemberDocument,
    options
  )
}
export type UpdateBackendMemberMutationHookResult = ReturnType<typeof useUpdateBackendMemberMutation>
export type UpdateBackendMemberMutationResult = Apollo.MutationResult<UpdateBackendMemberMutation>
export type UpdateBackendMemberMutationOptions = Apollo.BaseMutationOptions<
  UpdateBackendMemberMutation,
  UpdateBackendMemberMutationVariables
>
export const BackendSigninDocument = gql`
  mutation BackendSignin($memberId: Int!, $signature: String!, $timestamp: BigInt!) {
    signin(memberId: $memberId, signature: $signature, timestamp: $timestamp)
  }
`
export type BackendSigninMutationFn = Apollo.MutationFunction<BackendSigninMutation, BackendSigninMutationVariables>

/**
 * __useBackendSigninMutation__
 *
 * To run a mutation, you first call `useBackendSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBackendSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [backendSigninMutation, { data, loading, error }] = useBackendSigninMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      signature: // value for 'signature'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useBackendSigninMutation(
  baseOptions?: Apollo.MutationHookOptions<BackendSigninMutation, BackendSigninMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<BackendSigninMutation, BackendSigninMutationVariables>(BackendSigninDocument, options)
}
export type BackendSigninMutationHookResult = ReturnType<typeof useBackendSigninMutation>
export type BackendSigninMutationResult = Apollo.MutationResult<BackendSigninMutation>
export type BackendSigninMutationOptions = Apollo.BaseMutationOptions<
  BackendSigninMutation,
  BackendSigninMutationVariables
>
