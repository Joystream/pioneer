/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'
import BN from 'bn.js'

import { ALICE, CHARLIE } from '../data/addresses'
import { getApi, signAndSend } from '../lib/api'

async function proposal(api: ApiPromise) {
  console.log('============== PROPOSAL')
  const proposalExtrinsic = api.tx.proposalsCodex.createProposal(
    {
      staking_account_id: CHARLIE,
      member_id: '0',
      title: 'A proposal',
      description: 'This is a proposal',
    },
    {
      FundingRequest: [
        {
          account: ALICE,
          amount: new BN(1000),
        },
      ],
    }
  )

  await signAndSend(proposalExtrinsic, ALICE)
}

const main = async () => {
  const api = await getApi()

  await proposal(api)

  await api.disconnect()
}

main()
