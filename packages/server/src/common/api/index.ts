import path from 'path'

import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import { ApolloServer } from 'apollo-server'
import { makeSchema } from 'nexus'

import * as authSchema from '@/auth/api'
import * as notifierSchema from '@/notifier/api'

import { createContext } from './context'
import * as scalars from './scalars'

export { Context } from './context'

const schema = makeSchema({
  types: { scalars, ...authSchema, ...notifierSchema },
  contextType: { module: path.resolve('./context.ts'), export: 'Context' },
})

export const server = new ApolloServer({
  schema,
  context: createContext,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
