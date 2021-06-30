/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'

import memberData from '@/mocks/data/raw/members.json'

import { ALICE } from '../data/addresses'
import { getApi, signAndSend } from '../lib/api'

async function addMembers(api: ApiPromise) {
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
}

export const addMembersCommand = async () => {
  const api = await getApi()

  await addMembers(api)

  await api.disconnect()
}
