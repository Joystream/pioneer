/* eslint-disable no-console */
import { registry, types } from '@joystream/types'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import testKeyring from '@polkadot/keyring/testing'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { ISubmittableResult } from '@polkadot/types/types'
import chalk from 'chalk'

export const getApi = async () => {
  process.stdout.write('>> Connecting to API... ')
  const provider = new WsProvider('ws://127.0.0.1:9944')
  const api = await ApiPromise.create({ provider, rpc: jsonrpc, types: types, registry })

  console.log(chalk.green('✔'))
  return api
}

const keyring = testKeyring()

export async function signAndSend(tx: SubmittableExtrinsic<'promise'>, signer: string) {
  let unsubCb: () => void

  return new Promise<EventRecord[]>((resolve) => {
    tx.signAndSend(keyring.getPair(signer), function ({ events = [], status }: ISubmittableResult) {
      console.log(`Transaction status: ${chalk.blue(status.type)}`)

      if (status.isInBlock) {
        console.log(chalk.gray(' > Included at block hash' + status.asInBlock.toHex()))

        const eventsString = events
          .map(
            ({ event: { data, method, section }, phase }) =>
              `\t${phase.toString()}: ${section}.${method}${data.toString()}`
          )
          .join('\n')

        console.log(chalk.gray(` > Events:\n${eventsString}\n`))

        unsubCb()
        resolve(events)
      }
    }).then((unsub) => (unsubCb = unsub))
  })
}

export async function withApi(callback: (api: ApiPromise) => Promise<void>) {
  const api = await getApi()

  await callback(api)

  await api.disconnect()
}
