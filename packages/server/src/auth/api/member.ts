import * as prisma from '@prisma/client'
import { intArg, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { Member } from 'nexus-prisma'

import { authMemberId, verifyEmailToken, createEmailToken } from '@/auth/model/token'
import { Context } from '@/common/api'
import { PIONEER_URL } from '@/common/config'
import { configEmailProvider } from '@/common/utils/email'

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

  resolve: (_, __, { req }: Context): Promise<Member | null> => authMemberId(req),
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

  resolve: async (_, { token }: VerifyEmailArgs): Promise<Member | null> => {
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

type VerifyEmailVerificationArgs = { email: string }
export const sendEmailVerification = mutationField('sendEmailVerification', {
  type: 'Boolean',

  args: { email: nonNull(stringArg()) },

  resolve: async (_, { email }: VerifyEmailVerificationArgs, { req }: Context): Promise<boolean> => {
    const memberId = authMemberId(req)

    if (!memberId) return false

    const token = createEmailToken({ memberId, email })

    const verificationUrl = `${req?.headers.referer ?? PIONEER_URL}/#/?verify-email=${token}`

    await configEmailProvider()({
      to: email,

      subject: 'Confirm your email for Pioneer',

      text: `Token:${token}\nWith link to :${verificationUrl}`,
    })

    return true
  },
})
