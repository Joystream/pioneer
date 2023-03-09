import { pick } from 'lodash'
import { intArg, mutationField, nonNull, stringArg } from 'nexus'
import * as Yup from 'yup'

import { Context } from '@/api/context'
import { verifySignature } from '@/api/utils/signature'
import { createAuthToken, createEmailToken } from '@/api/utils/token'
import { PIONEER_URL } from '@/common/config'
import { configEmailProvider } from '@/common/utils/email'

export interface SignInArgs {
  memberId: number
  signature: string
  timestamp: number
}
export interface SignUpArgs extends SignInArgs {
  name: string
  email?: string
}

export const signin = mutationField('signin', {
  type: 'String',

  args: {
    memberId: nonNull(stringArg()),
    signature: nonNull(stringArg()),
    timestamp: nonNull(intArg()),
  },

  resolve: async (_, args: SignInArgs) => {
    const verification = await verifySignature(args.signature, args.memberId, args.timestamp)
    if (verification !== 'VALID') {
      return null
    }

    return createAuthToken(args.memberId)
  },
})

export const signup = mutationField('signup', {
  type: 'String',

  args: {
    memberId: nonNull(stringArg()),
    signature: nonNull(stringArg()),
    timestamp: nonNull(intArg()),
    name: nonNull(stringArg()),
    email: stringArg(),
  },

  resolve: async (_, args: SignUpArgs, { req, prisma }: Context) => {
    const verification = await verifySignature(args.signature, args.memberId, args.timestamp)
    if (verification !== 'VALID') {
      return null
    }

    const member = await prisma.member.create({ data: { id: args.memberId, name: args.name } })

    if (args.email && (await Yup.string().email().isValid(args.email))) {
      const token = createEmailToken(pick(args as Required<SignUpArgs>, 'email', 'memberId'))
      const verificationUrl = `${req.headers.referer ?? PIONEER_URL}/#/?verify-email=${token}`

      await configEmailProvider()({
        to: args.email,
        subject: 'Confirm your email for Pioneer',
        text: `Token:${token}\nWith link to :${verificationUrl}`,
      })
    }

    return member
  },
})
