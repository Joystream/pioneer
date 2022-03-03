import { ApolloQueryResult } from '@apollo/client'

export type RefetchQuery = () => Promise<ApolloQueryResult<unknown>>
