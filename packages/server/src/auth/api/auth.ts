import { arg, intArg, mutationField, nonNull, stringArg } from 'nexus'
import * as Yup from 'yup'

import { verifySignature } from '@/auth/model/signature'
import { createAuthToken } from '@/auth/model/token'
import { Context } from '@/common/api'

import { sendVerificationEmail } from '../model/emailVerification'

interface SignInArgs {
  memberId: number
  signature: string
  timestamp: number
}

export const signin = mutationField('signin', {
  type: 'String',

  args: {
    memberId: nonNull(intArg()),
    signature: nonNull(stringArg()),
    timestamp: nonNull(arg({ type: 'BigInt' })),
  },

  resolve: async (_, args: SignInArgs): Promise<string | null> => {
    const verification = await verifySignature(args.signature, args.memberId, args.timestamp)
    if (verification !== 'VALID') {
      throw new Error('Invalid signature')
    }

    return createAuthToken(args.memberId)
  },
})

export interface SignUpArgs extends SignInArgs {
  name: string
  email?: string
}

export const signup = mutationField('signup', {
  type: 'String',

  args: {
    memberId: nonNull(intArg()),
    name: nonNull(stringArg()),
    email: stringArg(),
    signature: nonNull(stringArg()),
    timestamp: nonNull(arg({ type: 'BigInt' })),
  },

  resolve: async (_, args: SignUpArgs, { req, prisma }: Context): Promise<string | null> => {
    const verification = await verifySignature(args.signature, args.memberId, args.timestamp)
    if (verification !== 'VALID') {
      throw new Error('Invalid signature')
    }

    if (args.email && !(await Yup.string().email().isValid(args.email))) {
      throw new Error('Invalid email')
    }

    // check if the member already exists
    const member = await prisma.member.findUnique({ where: { id: args.memberId } })
    if (member) {
      throw new Error('Member already exists')
    }
    await prisma.member.create({ data: { id: args.memberId, name: args.name, unverifiedEmail: args.email } })

    if (args.email) {
      await sendVerificationEmail({
        email: args.email,
        memberId: args.memberId,
        name: args.name,
        referer: req?.headers?.referer,
      })
    }

    return createAuthToken(args.memberId)
  },
})
