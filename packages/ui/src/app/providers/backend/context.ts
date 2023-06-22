import { ApolloClient } from '@apollo/client'
import { createContext } from 'react'

export const BackendContext = createContext<ApolloClient<any> | undefined>(undefined)
