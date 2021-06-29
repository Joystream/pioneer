/* eslint-disable no-console */
import { ApplicationMetadata, OpeningMetadata } from '@joystream/metadata-protobuf'
import { ApiPromise } from '@polkadot/api'

import { metadataToBytes } from '../../src/common/model/JoystreamNode'

import { getApi, signAndSend } from './lib/api'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
const ALICE_STASH = '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY'
const CHARLIE = '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'

async function staking(api: ApiPromise) {
  console.log('============== STAKING')
  const stakingCandidateTx = api.tx.members.addStakingAccountCandidate('0')
  const stakingConfirmTx = api.tx.members.confirmStakingAccount('0', CHARLIE)

  await signAndSend(stakingCandidateTx, CHARLIE)
  await signAndSend(stakingConfirmTx, ALICE)
}

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
      Signal: 'Foo bar',
    }
  )

  await signAndSend(proposalExtrinsic, ALICE)
}

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

  await staking(api)
  await proposal(api)
  await opening(api)

  await api.disconnect()
}

main()
