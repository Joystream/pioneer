/* eslint-disable no-console */
import { ApplicationMetadata, OpeningMetadata } from '@joystream/metadata-protobuf'
import { registry, types } from '@joystream/types'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import testKeyring from '@polkadot/keyring/testing'
import { KeyringInstance } from '@polkadot/keyring/types'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { IKeyringPair, ISubmittableResult } from '@polkadot/types/types'

import { metadataToBytes } from '../../src/common/model/JoystreamNode'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
const ALICE_STASH = '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY'
const CHARLIE = '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'

const getApi = async () => {
  const provider = new WsProvider('ws://127.0.0.1:9944')
  return await ApiPromise.create({ provider, rpc: jsonrpc, types: types, registry })
}

async function signAndSend(stakingConfirmTx: SubmittableExtrinsic<'promise'>, aliceSigner: IKeyringPair) {
  let unsubCb: () => void

  return new Promise<void>((resolve) => {
    stakingConfirmTx
      .signAndSend(aliceSigner, function ({ events = [], status }: ISubmittableResult) {
        console.log('Transaction status:', status.type)

        if (status.isInBlock) {
          console.log(' > Included at block hash', status.asInBlock.toHex())
          console.log(' > Events:')

          events.forEach(({ event: { data, method, section }, phase }) => {
            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString())
          })
        } else if (status.isFinalized) {
          console.log(' > Finalized block hash', status.asFinalized.toHex())

          unsubCb()
          resolve()
        }
      })
      .then((unsub) => (unsubCb = unsub))
  })
}

async function staking(api: ApiPromise, keyring: KeyringInstance) {
  console.log('============== STAKING')
  const stakingCandidateTx = api.tx.members.addStakingAccountCandidate('0')
  const stakingConfirmTx = api.tx.members.confirmStakingAccount('0', CHARLIE)

  await signAndSend(stakingCandidateTx, keyring.getPair(CHARLIE))
  await signAndSend(stakingConfirmTx, keyring.getPair(ALICE))
}

async function proposal(api: ApiPromise, keyring: KeyringInstance) {
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

  await signAndSend(proposalExtrinsic, keyring.getPair(ALICE))
}

async function opening(api: ApiPromise, keyring: KeyringInstance) {
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

  await signAndSend(api.tx.sudo.sudo(createOpening), keyring.getPair(ALICE))

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
  await signAndSend(applyOnOpeningTx, keyring.getPair(ALICE))
}

const main = async () => {
  const api = await getApi()
  const keyring = testKeyring()

  await staking(api, keyring)
  await proposal(api, keyring)
  await opening(api, keyring)

  await api.disconnect()
}

main()
