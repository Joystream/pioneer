/* eslint-disable no-console */
import '@joystream/types'
import { ApiPromise, ApiRx, WsProvider } from '@polkadot/api'
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types'
import { createTestKeyring } from '@polkadot/keyring/testing'
import { KeyringPair } from '@polkadot/keyring/types'
import { DispatchError, EventRecord } from '@polkadot/types/interfaces/system'
import { ISubmittableResult, ITuple } from '@polkadot/types/types'
import chalk from 'chalk'
import { isString } from 'lodash'
import { firstValueFrom } from 'rxjs'

const isError = ({ event: { method } }: EventRecord) => method === 'ExtrinsicFailed' || method === 'BatchInterrupted'

const hasError = (events: EventRecord[]): boolean => {
  return !!events.find(isError)
}

type Api<T extends ApiTypes> = T extends 'promise' ? ApiPromise : ApiRx
export const getApi = async <T extends ApiTypes>(apiType: T, endpoint = 'ws://127.0.0.1:9944'): Promise<Api<T>> => {
  process.stdout.write(`>> Connecting to API endpoint (${chalk.blue(endpoint)})... `)
  const provider = new WsProvider(endpoint)

  const api = await (apiType === 'promise'
    ? ApiPromise.create({ provider })
    : firstValueFrom(ApiRx.create({ provider })))

  console.log(chalk.green('✔'))
  return api as Api<T>
}

export const keyring = createTestKeyring()

const trim = (message: string, maxLength = 80) =>
  message.length > maxLength ? message.slice(0, maxLength) + '...' : message

const describeTx = (tx: SubmittableExtrinsic<'promise'>) => {
  console.log(
    `Sending: ${chalk.yellow(`api.tx.${tx.method.section}.${tx.method.method}(${trim(tx.method.args.toString())})`)}`
  )
}

export async function signAndSend(
  tx: SubmittableExtrinsic<'promise'>,
  signer: string | KeyringPair,
  innerTx?: SubmittableExtrinsic<'promise'>
) {
  let unsubCb: () => void

  describeTx(innerTx ?? tx)

  const keyPair = isString(signer) ? keyring.getPair(signer) : signer

  return new Promise<EventRecord[]>((resolve) => {
    tx.signAndSend(keyPair, function ({ events = [], status }: ISubmittableResult) {
      console.log(`Transaction status: ${chalk.blue(status.type)}`)

      if (status.isInBlock) {
        console.log(chalk.gray(' > Included at block hash' + status.asInBlock.toHex()))

        const eventsString = events
          .map((event) => {
            const {
              event: { data, method, section },
              phase,
            } = event

            let errorType = ''

            const hasError = isError(event)

            if (hasError) {
              const [dispatchError] = data as unknown as ITuple<[DispatchError]>
              errorType = dispatchError.type

              if (dispatchError.isModule) {
                const mod = dispatchError.asModule
                const error = dispatchError.registry.findMetaError(mod)
                errorType = `${error.section}.${error.name}`
              }
            }

            return `\t${phase.toString()}: ${section}.${method}${data.toString()} ${
              hasError ? '\n\t\tError: ' + chalk.red(errorType) : ''
            }`
          })
          .join('\n')

        console.log(chalk.gray(` > Events:\n${eventsString}\n`))

        console.log(`Transaction result: ${hasError(events) ? chalk.red('✕ Error') : chalk.green('✓ Success')}\n\n`)

        unsubCb()
        resolve(events)
      }
    }).then((unsub) => (unsubCb = unsub))
  })
}

export const withApi = withPromiseApi('ws://127.0.0.1:9944')

export function withPromiseApi(endpoint: string) {
  return async <T>(callback: (api: ApiPromise) => Promise<T>) => {
    const api = await getApi('promise', endpoint)

    const result = await callback(api)

    await api.disconnect()

    return result
  }
}

export function withRxApi(endpoint: string) {
  return async <T>(callback: (api: ApiRx) => Promise<T>) => {
    const api = await getApi('rxjs', endpoint)

    const result = await callback(api)

    await api.disconnect()

    return result
  }
}
