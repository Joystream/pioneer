/* eslint-disable no-console */
import memberData from '../../../src/mocks/data/raw/members.json'
import { ALICE } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'

export const addMembersCommand = async () => {
  await withApi(async (api) => {
    const members = memberData

    const createMembers = members.map((member) => {
      return api?.tx.members.buyMembership({
        handle: member.handle,
        metadata: {
          name: member.metadata.name,
          about: member.metadata.about,
        },
        root_account: member.rootAccount,
        controller_account: member.controllerAccount,
      })
    })

    const tx = api.tx.utility.batch(createMembers)

    await signAndSend(tx, ALICE)
  })
}

export const addMembersModule = {
  command: 'create-members',
  describe: 'Create member accounts from mocks',
  handler: addMembersCommand,
}
