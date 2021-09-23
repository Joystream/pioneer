/* eslint-disable no-console */
import { MembershipMetadata } from '@joystream/metadata-protobuf'

import { metadataToBytes } from '../../../src/common/model/JoystreamNode'
import memberData from '../../../src/mocks/data/raw/members.json'
import { getSudoAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'

export const createMembersCommand = async () => {
  await withApi(async (api) => {
    const members = memberData

    const createMembers = members.map((member) => {
      return api.tx.members.buyMembership({
        handle: member.handle,
        metadata: metadataToBytes(MembershipMetadata, {
          name: member.metadata.name,
          about: member.metadata.about,
        }),
        root_account: member.rootAccount,
        controller_account: member.controllerAccount,
      })
    })

    const tx = api.tx.utility.batch(createMembers)

    await signAndSend(tx, getSudoAccount())
  })
}

export const createMembersModule = {
  command: 'members:create',
  describe: 'Create member accounts from mocks',
  handler: createMembersCommand,
}
