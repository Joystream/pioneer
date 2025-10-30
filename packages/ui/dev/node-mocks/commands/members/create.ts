/* eslint-disable no-console */
import { MembershipMetadata } from '@joystream/metadata-protobuf'
import { ApiPromise } from '@polkadot/api'

import { metadataToBytes } from '@/common/model/JoystreamNode'
import members from '@/mocks/data/raw/members.json'

import { getSudoAccount } from '../../data/addresses'
import { signAndSend, withApi } from '../../lib/api'

export const createMembersCommand = async (api: ApiPromise) => {
  const nextId = await api.query.members.nextMemberId()

  if (Number(nextId) > 0) {
    console.log('Some members were already added')
    return
  }

  const createMembers = members.map((member) => {
    return api.tx.members.buyMembership({
      handle: member.handle,
      metadata: metadataToBytes(MembershipMetadata, {
        name: member.metadata.name,
        about: member.metadata.about,
      }),
      rootAccount: member.rootAccount,
      controllerAccount: member.controllerAccount,
    })
  })

  const tx = api.tx.utility.batch(createMembers)

  await signAndSend(tx, getSudoAccount())

  await Promise.all(
    members.map(async ({ id, boundAccounts, controllerAccount }) => {
      for (const boundAccount of boundAccounts) {
        // Bind staking account
        await signAndSend(api.tx.members.addStakingAccountCandidate(id), boundAccount)

        // Confirm staking account
        await signAndSend(api.tx.members.confirmStakingAccount(id, boundAccount), controllerAccount)
      }
    })
  )
}

export const createMembersModule = {
  command: 'members:create',
  describe: 'Create member accounts from mocks',
  handler: () => withApi(createMembersCommand),
}
