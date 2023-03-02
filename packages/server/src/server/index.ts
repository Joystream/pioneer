import path from 'path'

import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import { ApolloServer } from 'apollo-server'
import { makeSchema } from 'nexus'

import { createContext } from './context'
import * as schemaTypes from './schema'

const schema = makeSchema({
  types: schemaTypes,
  contextType: { module: path.resolve('./context.ts'), export: 'Context' },
})

const server = new ApolloServer({
  schema,
  context: createContext,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

server.listen(3000).then(({ url }) => {
  process.stdout.write(`🚀 Server ready at ${url}\n`)
})
