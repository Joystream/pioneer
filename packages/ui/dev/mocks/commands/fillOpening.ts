/* eslint-disable no-console */
import { registry } from '@joystream/types'
import { JoyBTreeSet } from '@joystream/types/common'
import { ApplicationId } from '@joystream/types/working-group'
import { ApiPromise } from '@polkadot/api'

import { ALICE } from '../data/addresses'
import { getApi, signAndSend } from '../lib/api'

async function fillOpening(api: ApiPromise) {
  console.log('============== WITHDRAW')
  const applicationsSet = new (JoyBTreeSet(ApplicationId))(registry, [1])
  const withdrawOpening = api.tx.membershipWorkingGroup.fillOpening(1, applicationsSet)

  await signAndSend(api.tx.sudo.sudo(withdrawOpening), ALICE)
}

const main = async () => {
  const api = await getApi()

  await fillOpening(api)

  await api.disconnect()
}

main()
