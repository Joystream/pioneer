import { objectType, queryField } from 'nexus'
import { Member } from 'nexus-prisma'

import { Context } from '@/server/context'
import { authMemberId } from '@/server/utils/token'

export const MemberFields = objectType({
  name: Member.$name,
  description: Member.$description,
  definition(t) {
    t.field(Member.id)
    t.field(Member.name)
    t.field(Member.email)
    t.field(Member.chainMemberId)
  },
})

export const MemberQuery = queryField('member', {
  type: Member.$name,
  resolve: async (_, __, { prisma, req }: Context) => {
    const id = authMemberId(req)
    if (!id) return null

    return prisma.member.findFirst({ where: { id } })
  },
})
