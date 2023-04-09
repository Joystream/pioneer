import { ExpressContext } from 'apollo-server-express'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { pick } from 'lodash'
import * as Yup from 'yup'

import { APP_SECRET_KEY } from '@/common/config'

enum TokenType {
  Authentification,
  EmailVerification,
}

interface AuthTokenPayload {
  type: TokenType.Authentification
  exp: number
  memberId: number
}

const jwtToken = Yup.object({ iat: Yup.number() })

const AUTH_TOKEN_TTL = 3600_000 * 24 * 90

export const createAuthToken = (memberId: number): string => {
  const exp = Date.now() + AUTH_TOKEN_TTL
  const payload: AuthTokenPayload = { memberId, type: TokenType.Authentification, exp }
  return sign(payload, APP_SECRET_KEY)
}

export const authMemberId = (req: ExpressContext['req'] | undefined): number | undefined => {
  const authHeader = req?.get('Authorization')
  const token = authHeader?.match(/(?<=^Bearer +)\S+/)?.[0]
  if (!token) return

  const payload = verify(token, APP_SECRET_KEY)
  if (!isValidAuthTokenPayload(payload) || payload.exp < Date.now()) return

  return payload.memberId
}

const isValidAuthTokenPayload = (payload: string | JwtPayload): payload is AuthTokenPayload =>
  jwtToken
    .shape({
      type: Yup.number().equals([TokenType.Authentification]),
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
