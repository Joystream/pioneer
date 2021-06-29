/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'

import { BOB, BOB_STASH } from './data/addresses'
import { getApi, signAndSend } from './lib/api'

async function staking(api: ApiPromise) {
  const stakingCandidateTx = api.tx.members.addStakingAccountCandidate('1')
  const stakingConfirmTx = api.tx.members.confirmStakingAccount('1', BOB_STASH)

  await signAndSend(stakingCandidateTx, BOB_STASH)
  await signAndSend(stakingConfirmTx, BOB)
}

const main = async () => {
  const api = await getApi()

  await staking(api)

  await api.disconnect()
}

main()
