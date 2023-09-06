import * as Prisma from '@prisma/client'
import { intArg, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { Member } from 'nexus-prisma'

import { verifyEmailToken } from '@/auth/model/token'
import { Context } from '@/common/api'

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

  resolve: (_, __, { member }: Context) => {
    if (!member) {
      throw new Error('Unauthorized')
    }

    return member
  },
})

type memberExistArg = { id: number }
export const memberExist = queryField('memberExist', {
  type: 'Boolean',

  args: { id: intArg() },

  resolve: async (_, { id }: memberExistArg, { prisma }: Context): Promise<boolean> =>
    (await prisma.member.findFirst({ where: { id } })) !== null,
})

type VerifyEmailArgs = { token: string }
export const verifyEmail = mutationField('verifyEmail', {
  type: Member.$name,

  args: { token: nonNull(stringArg()) },

  resolve: async (_, { token }: VerifyEmailArgs, { prisma }: Context): Promise<Prisma.Member | null> => {
    const { memberId, email } = verifyEmailToken(token) ?? {}
    if (!memberId || !email) return null

    const member = await prisma.member.findUnique({ where: { id: memberId } })
    if (!member) return null

    if (member.email === email) {
      return member
    }

    return await prisma.member.update({ where: { id: memberId }, data: { email } })
  },
})
