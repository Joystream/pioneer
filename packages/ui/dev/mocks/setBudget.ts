/* eslint-disable no-console */
import { registry, types } from '@joystream/types'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import testKeyring from '@polkadot/keyring/testing'
import { KeyringInstance } from '@polkadot/keyring/types'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { IKeyringPair, ISubmittableResult } from '@polkadot/types/types'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'

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

const BUDGET = 10_000

async function budget(api: ApiPromise, keyring: KeyringInstance) {
  console.log('============== Set budget')
  const setBudgetTx = api.tx.sudo.sudo(api.tx.membershipWorkingGroup.setBudget(BUDGET))

  await signAndSend(setBudgetTx, keyring.getPair(ALICE))
}

const main = async () => {
  const api = await getApi()
  const keyring = testKeyring()

  await budget(api, keyring)

  await api.disconnect()
}

main()
