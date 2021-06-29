/* eslint-disable no-console */
import { ApplicationMetadata, OpeningMetadata } from '@joystream/metadata-protobuf'
import { ApiPromise } from '@polkadot/api'

import { metadataToBytes } from '../../src/common/model/JoystreamNode'

import { ALICE, ALICE_STASH, CHARLIE } from './data/addresses'
import { getApi, signAndSend } from './lib/api'

async function opening(api: ApiPromise) {
  console.log('============== OPENING')
  const createOpening = api.tx.membershipWorkingGroup.addOpening(
    metadataToBytes(OpeningMetadata, {
      shortDescription: 'Test opening',
      description: '# Test opening',
      expectedEndingTimestamp: new Date().getTime() + 10000,
      hiringLimit: 1,
      applicationDetails: 'Details',
      applicationFormQuestions: [
        { question: 'Question 1?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXT },
        { question: 'Question 2?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXTAREA },
      ],
    }),
    'Leader',
    { stake_amount: 10_000, leaving_unstaking_period: 360_000 },
    '1337'
  )

  await signAndSend(api.tx.sudo.sudo(createOpening), ALICE)

  const applyOnOpeningTx = api.tx.membershipWorkingGroup.applyOnOpening({
    opening_id: 1,
    member_id: 0,
    role_account_id: ALICE_STASH,
    reward_account_id: ALICE,
    description: metadataToBytes(ApplicationMetadata, { answers: ['foo', 'ab'] }),
    stake_parameters: {
      stake: '10000',
      staking_account_id: CHARLIE,
    },
  })
  await signAndSend(applyOnOpeningTx, ALICE)
}

const main = async () => {
  const api = await getApi()

  await opening(api)

  await api.disconnect()
}

main()
