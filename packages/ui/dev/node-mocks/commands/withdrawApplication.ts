/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'

import { ALICE_STASH } from '../data/addresses'
import { getApi, signAndSend } from '../lib/api'

async function withdraw(api: ApiPromise) {
  console.log('============== WITHDRAW')
  const withdrawOpening = api.tx.membershipWorkingGroup.withdrawApplication(0)

  await signAndSend(withdrawOpening, ALICE_STASH)
}

const main = async () => {
  const api = await getApi()

  await withdraw(api)

  await api.disconnect()
}

main()
