import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetBackendMemberExistsQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type GetBackendMemberExistsQuery = { __typename: 'Query'; memberExist?: boolean | null }

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
