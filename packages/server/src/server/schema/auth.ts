import { pick } from 'lodash'
import { intArg, mutationField, nonNull, stringArg } from 'nexus'
import * as Yup from 'yup'

import { PIONEER_URL } from '@/common/config'
import { Context } from '@/server/context'
import { verifySignature } from '@/server/utils/signature'
import { createAuthToken, createEmailToken } from '@/server/utils/token'

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

      // TODO send an email instead of logging the token
      console.log(`Send email:\nTo ${args.email}\nToken:${token}\nWith link to :${verificationUrl}`)
    }

    return member
  },
})
