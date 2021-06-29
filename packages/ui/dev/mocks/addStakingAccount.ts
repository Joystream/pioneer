/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'

import { ALICE, CHARLIE } from './data/addresses'
import { getApi, signAndSend } from './lib/api'

async function staking(api: ApiPromise) {
  console.log('============== STAKING')
  const stakingCandidateTx = api.tx.members.addStakingAccountCandidate('0')
  const stakingConfirmTx = api.tx.members.confirmStakingAccount('0', CHARLIE)

  await signAndSend(stakingCandidateTx, CHARLIE)
  await signAndSend(stakingConfirmTx, ALICE)
}

const main = async () => {
  const api = await getApi()

  await staking(api)

  await api.disconnect()
}

main()
