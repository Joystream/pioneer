/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'

import { CHARLIE } from '../data/addresses'
import { getApi, signAndSend } from '../lib/api'

async function staking(api: ApiPromise) {
  console.log('============== STAKING')
  const removeStakingTx = api.tx.members.removeStakingAccount('0')

  await signAndSend(removeStakingTx, CHARLIE)
}

const main = async () => {
  const api = await getApi()

  await staking(api)

  await api.disconnect()
}

main()
