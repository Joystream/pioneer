/* eslint-disable no-console */
import { registry, types } from '@joystream/types'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import testKeyring from '@polkadot/keyring/testing'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { ISubmittableResult } from '@polkadot/types/types'

export const getApi = async () => {
  console.log('>> Connecting to API...')
  const provider = new WsProvider('ws://127.0.0.1:9944')
  const api = await ApiPromise.create({ provider, rpc: jsonrpc, types: types, registry })

  console.log('>> ...connected!')
  return api
}

const keyring = testKeyring()

export async function signAndSend(tx: SubmittableExtrinsic<'promise'>, signer: string) {
  let unsubCb: () => void

  return new Promise<void>((resolve) => {
    tx.signAndSend(keyring.getPair(signer), function ({ events = [], status }: ISubmittableResult) {
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
    }).then((unsub) => (unsubCb = unsub))
  })
}
