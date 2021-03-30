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

      const membersMap = new Map<string, string[]>()

      mockMembers.map((member) => {
        const temporary: any = { ...member }

        if (temporary.invitedById) {
          // TODO: Mirage: The membership model has multiple possible inverse associations for the membership.invitedBy association.
          // temporary.invitedBy = membersMap.get(temporary.invitedById)
          delete temporary.invitedById
        }

        const membership = server.schema.create('Membership', {
          ...temporary,
          registeredAtBlock: blocksMap.get(member.registeredAtBlock),
        })

        membersMap.set(member.id, membership)

        return membership
      })
    },
  })
}
