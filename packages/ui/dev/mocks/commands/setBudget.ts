/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'

import { getApi, signAndSend } from '../lib/api'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'

const BUDGET = 10_000

async function budget(api: ApiPromise) {
  console.log('============== Set budget')
  const setBudgetTx = api.tx.sudo.sudo(api.tx.membershipWorkingGroup.setBudget(BUDGET))

  await signAndSend(setBudgetTx, ALICE)
}

const main = async () => {
  const api = await getApi()

  await budget(api)

  await api.disconnect()
}

main()
