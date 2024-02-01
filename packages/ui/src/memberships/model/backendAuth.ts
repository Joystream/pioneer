import { SignerPayloadRaw } from '@polkadot/types/types'

import { Wallet } from '@/accounts/types/wallet'

import { Member } from '../types'

export async function getBackendAuthSignature(member: Member, wallet: Wallet) {
  const address = member.controllerAccount
  const timestamp = Date.now()
  const result = await wallet.getSigner(address)?.signRaw?.({
    address,
    data: `${member.id}:${timestamp}`,
  } as SignerPayloadRaw)
  if (!result) throw new Error('Missing signature')
  return { signature: result.signature, timestamp }
}
