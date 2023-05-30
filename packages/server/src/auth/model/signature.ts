import { signatureVerify } from '@polkadot/util-crypto'
import { request } from 'graphql-request'

import { QUERY_NODE_ENDPOINT } from '@/common/config'
import { GetMembershipByIdDocument } from '@/common/queries'

const SIGNATURE_TTL = 3600 * 1000

export const verifySignature = async (
  signature: string,
  membershipId: number,
  timestamp: number
): Promise<'EXPIRED' | 'INVALID' | 'VALID'> => {
  if (Date.now() - timestamp > SIGNATURE_TTL) {
    return 'EXPIRED'
  }

  const variables = { id: String(membershipId) }
  const { membershipByUniqueInput } = await request(QUERY_NODE_ENDPOINT, GetMembershipByIdDocument, variables)
  const controllerAccount = membershipByUniqueInput?.controllerAccount
  if (!controllerAccount) {
    return 'INVALID'
  }

  try {
    const { isValid } = signatureVerify(`${membershipId}:${timestamp}`, signature, controllerAccount)
    return isValid ? 'VALID' : 'INVALID'
  } catch {
    return 'INVALID'
  }
}
