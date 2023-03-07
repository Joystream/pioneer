import { mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { Member } from 'nexus-prisma'

import { Context } from '@/server/context'
import { authMemberId, verifyEmailToken } from '@/server/utils/token'

export const MemberFields = objectType({
  name: Member.$name,
  description: Member.$description,
  definition(t) {
    t.field(Member.id)
    t.field(Member.name)
    t.field(Member.email)
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

export const verifyEmail = mutationField('verifyEmail', {
  type: Member.$name,
  args: { token: nonNull(stringArg()) },
  resolve: async (_, { token }: { token: string }, { prisma, req }: Context) => {
    const id = authMemberId(req)
    if (!id) return null

    const { memberId, email } = verifyEmailToken(token) ?? {}
    if (memberId !== id || !email) return null

    const member = await prisma.member.findFirst({ where: { id } })
    if (!member) return null

    if (member.email === email) {
      return member
    }

    return await prisma.member.update({ where: { id }, data: { email } })
  },
})