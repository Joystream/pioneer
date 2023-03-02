import { compare, hash } from 'bcrypt'
import { enumType, mutationField, nonNull, stringArg } from 'nexus'
import * as Yup from 'yup'
import YupPassword from 'yup-password'

import { PIONEER_URL } from '@/common/config'
import { Context } from '@/server/context'
import { createAuthToken, createEmailToken, verifyEmailToken } from '@/server/utils/token'

YupPassword(Yup)

export interface SignInArgs {
  email: string
  password: string
}
export interface SignUpArgs extends SignInArgs {
  chainMemberId: string
  name: string
}

export const SignUpOutcome = enumType({
  name: 'SignUpOutcome',
  members: ['InvalidMemberArgument', 'EmailAlreadyRegistered', 'Success'],
})
export const signup = mutationField('signup', {
  type: 'SignUpOutcome',
  args: {
    chainMemberId: nonNull(stringArg()),
    name: nonNull(stringArg()),
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, args: SignUpArgs, { req, prisma }: Context) => {
    if (!(await SignUpArgsSchema.isValid(args))) {
      return 'InvalidMemberArgument'
    }

    if (await prisma.member.findFirst({ where: { email: args.email } })) {
      return 'EmailAlreadyRegistered'
    }

    const password = await hash(args.password, 10)
    const token = createEmailToken({ ...args, password })
    const verificationUrl = `${req.headers.referer ?? PIONEER_URL}/#/?verify-email=${token}`

    // TODO send an email instead of logging the token
    console.log(`Send email:\nTo ${args.email}\nToken:${token}\nWith link to :${verificationUrl}`)

    return 'Success'
  },
})

export const signin = mutationField('signin', {
  type: 'String',
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, { email, password }, { prisma }: Context) => {
    await SignInArgsSchema.validate({ email, password })

    const member = await prisma.member.findFirst({ where: { email } })
    if (!member || !(await compare(password, member.password))) {
      return null
    }

    return createAuthToken(member.id)
  },
})

export const verifyEmail = mutationField('verifyEmail', {
  type: 'String',
  args: { token: nonNull(stringArg()) },
  resolve: async (_, { token }, { prisma }: Context) => {
    const signUpArgs = verifyEmailToken(token)
    if (!signUpArgs) return null

    const member = await prisma.member.create({ data: signUpArgs })

    return createAuthToken(member.id)
  },
})

export const SignInArgsSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
})

export const SignUpArgsSchema = SignInArgsSchema.shape({
  email: Yup.string().max(30).email().required(),
  password: Yup.string().max(20).password().required(),
  chainMemberId: Yup.string().max(20).required(),
  name: Yup.string().max(20).required(),
})
