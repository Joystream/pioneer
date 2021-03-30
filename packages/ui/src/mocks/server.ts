import { createGraphQLHandler } from '@miragejs/graphql'
import { createServer } from 'miragejs'

import schema from '../api/schemas/schema.graphql'
import { mockBlocks, mockMembers } from './data'
import { getMemberResolver, getMembersResolver, searchMembersResolver } from './resolvers'

export const makeServer = (environment = 'development') => {
  return createServer({
    environment,

    routes() {
      this.post(
        'http://localhost:8081/graphql',
        createGraphQLHandler(schema, this.schema, {
          context: undefined,
          root: undefined,
          resolvers: {
            Query: {
              membership: getMemberResolver,
              memberships: getMembersResolver,
              searchMemberships: searchMembersResolver,
            },
          },
        })
      )
    },

    // TODO - better server type
    seeds(server: any) {
      const blocksMap = mockBlocks.reduce((map, block) => {
        return map.set(block.id, server.schema.create('Block', { ...block }))
      }, new Map())

      const inviteeMap = new Map<string, string[]>()

      mockMembers.map((member) => {
        const temporary = { ...member }

        if (temporary?.invitees?.length) {
          inviteeMap.set(member.id, temporary.invitees)
          delete temporary.invitees
        }

        return server.schema.create('Membership', {
          ...temporary,
          registeredAtBlock: blocksMap.get(member.registeredAtBlock),
        })
      })

      for (const [invitor, invitees] of inviteeMap) {
        const member = server.schema.find('Membership', invitor)
        //member.invitees = invitees.map((id) => server.schema.find('Membership', id))
        //member.save()
      }
    },
  })
}
