import { Member } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { isNumber, pick } from 'lodash'
import { error } from 'npmlog'
import * as Yup from 'yup'

import { APP_SECRET_KEY } from '@/common/config'
import { prisma } from '@/common/prisma'

enum TokenType {
  Authentication,
  EmailVerification,
}

interface AuthTokenPayload {
  type: TokenType.Authentication
  exp: number
  memberId: number
}

const jwtToken = Yup.object({ iat: Yup.number() })

const AUTH_TOKEN_TTL = 3600_000 * 24 * 90

export const createAuthToken = (memberId: number, secret = APP_SECRET_KEY): string => {
  const exp = Date.now() + AUTH_TOKEN_TTL
  const payload: AuthTokenPayload = { memberId, type: TokenType.Authentication, exp }
  return sign(payload, secret)
}

export const getAuthenticatedMember = async (req: ExpressContext['req'] | undefined): Promise<Member | null> => {
  const authHeader = req?.get('Authorization')
  const token = authHeader?.match(/(?<=^Bearer +)\S+/)?.[0]
  if (!token) {
    return null
  }
  try {
    const payload = verify(token, APP_SECRET_KEY)
    if (!isValidAuthTokenPayload(payload) || payload.exp < Date.now() || !isNumber(payload.memberId)) {
      return null
    }

    const member = await prisma.member.findUnique({ where: { id: payload.memberId } })
    if (!member) {
      // this shouldn't happen - if it does, it means that the token was created for a member that no longer exists
      error('Auth', `Member ${payload.memberId} with valid JWT not found`)
      return null
    }
    return member
  } catch {
    return null
  }
}

const isValidAuthTokenPayload = (payload: string | JwtPayload): payload is AuthTokenPayload =>
  jwtToken
    .shape({
      type: Yup.number().equals([TokenType.Authentication]),
      memberId: Yup.number().required(),
      exp: Yup.number().required(),
    })
    .isValidSync(payload)

interface EmailTokenArgs {
  memberId: number
  email: string
}
interface EmailTokenPayload extends EmailTokenArgs {
  type: TokenType.EmailVerification
}

export const createEmailToken = ({ memberId, email }: EmailTokenArgs): string => {
  const payload: EmailTokenPayload = { memberId, email, type: TokenType.EmailVerification }
  return sign(payload, APP_SECRET_KEY)
}

export const verifyEmailToken = (emailToken: string): EmailTokenArgs | undefined => {
  const payload = verify(emailToken, APP_SECRET_KEY)
  if (!isValidEmailTokenPayload(payload)) return

  return pick(payload, 'memberId', 'email')
}

const isValidEmailTokenPayload = (payload: string | JwtPayload): payload is EmailTokenPayload =>
  jwtToken
    .shape({
      type: Yup.number().equals([TokenType.EmailVerification]).required(),
      memberId: Yup.number().required(),
      email: Yup.string().email().required(),
    })
    .isValidSync(payload)
