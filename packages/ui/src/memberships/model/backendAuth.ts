import { Wallet } from 'injectweb3-connect'

import { Member } from '../types'

export async function getBackendAuthSignature(member: Member, wallet: Wallet) {
  const timestamp = Date.now()
  const result = await wallet.signer.signRaw({
    address: member.controllerAccount,
    data: `${member.id}:${timestamp}`,
  })
  if (!result) throw new Error('Missing signature')
  return { signature: result.signature, timestamp }
}
