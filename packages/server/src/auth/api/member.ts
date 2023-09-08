import { Member } from '@prisma/client'
import { intArg, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { Member as NexusMember } from 'nexus-prisma'
import { error } from 'npmlog'
import * as Yup from 'yup'

import { verifyEmailToken } from '@/auth/model/token'
import { Context } from '@/common/api'

import { sendVerificationEmail } from '../model/emailVerification'

export const MemberFields = objectType({
  name: NexusMember.$name,
  description: NexusMember.$description,
  definition(t) {
    t.field(NexusMember.id)
    t.field(NexusMember.name)
    t.field(NexusMember.email)
  },
})

export const MemberQuery = queryField('member', {
  type: NexusMember.$name,

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
  type: NexusMember.$name,

  args: { token: nonNull(stringArg()) },

  resolve: async (_, { token }: VerifyEmailArgs, { prisma }: Context): Promise<Member | null> => {
    const { memberId, email } = verifyEmailToken(token) ?? {}
    if (!memberId || !email) {
      throw new Error('Invalid verification token')
    }

    const member = await prisma.member.findUnique({ where: { id: memberId } })
    if (!member) {
      error('Auth', `Member ${memberId} with valid email verification token not found`)
      throw new Error('Internal error')
    }

    if (member.email === email) {
      return member
    }

    return await prisma.member.update({ where: { id: memberId }, data: { email } })
  },
})

type InitEmailChangeArgs = { email: string }
export const initEmailChange = mutationField('initEmailChange', {
  type: 'Boolean',

  args: { email: nonNull(stringArg()) },

  resolve: async (_, { email }: InitEmailChangeArgs, { req, member }: Context): Promise<boolean> => {
    if (!member) {
      throw new Error('Unauthorized')
    }

    const isEmailValid = await Yup.string().email().isValid(email)
    if (!isEmailValid) {
      throw new Error('Invalid email')
    }

    await sendVerificationEmail({ email, memberId: member.id, name: member.name, referer: req?.headers?.referer })

    return true
  },
})
