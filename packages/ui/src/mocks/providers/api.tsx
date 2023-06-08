import { get, set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { Api } from '@/api'
import { ApiContext } from '@/api/providers/context'
import { UseApi } from '@/api/providers/provider'
import { createType } from '@/common/model/createType'
import { isDefined } from '@/common/utils'

type ValueMock = { value?: any; get?: (args: any) => any; wrapperFn?: (result: any) => any }
type TxMock = { path: string; paymentInfo?: ValueMock; signAndSend?: ValueMock }
type DefaultMock = { path: string } & ValueMock
type APIMock = {
  consts?: DefaultMock[]
  derive?: DefaultMock[]
  query?: DefaultMock[]
  rpc?: DefaultMock[]
  tx: TxMock[]
}

type Context = { args: any; parameters: { api?: APIMock } }
export const APIDecorator = (Story: CallableFunction, { args, parameters }: Context) => {
  if (!parameters.api) {
    return Story()
  }

  // Add default mocks
  const api = {
    _async: { chainMetadata: Promise.resolve({}) },
    isConnected: true,
    consts: {},
    derive: {},
    query: {},
    rpc: {
      chain: {
        getBlockHash: () => of(createType('BlockHash', '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')),
        subscribeNewHeads: () =>
          of(
            createType('Header', {
              parentHash: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
              number: 1337,
              stateRoot: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
              extrinsicsRoot: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
              digest: {
                logs: [],
              },
            })
          ),
      },
    },
    tx: {},
  } as Api

  // Add mocks from parameters
  parameters.api.consts?.forEach(setDefaultMock('consts', api, args))
  parameters.api.derive?.forEach(setDefaultMock('derive', api, args, (x) => () => of(x)))
  parameters.api.query?.forEach(setDefaultMock('query', api, args, (x) => () => of(x)))
  parameters.api.rpc?.forEach(setDefaultMock('rpc', api, args, (x) => () => of(x)))
  const setTxMock = setDefaultMock('tx', api, args)
  parameters.api.tx?.forEach(({ path, paymentInfo, signAndSend }) => {
    setTxMock({ wrapperFn: (x) => () => of(x), ...paymentInfo, path: `${path}.paymentInfo` })
    setTxMock({ ...signAndSend, path: `${path}.signAndSend` })
  })

  // Set context
  const contextValue: UseApi = {
    api,
    isConnected: true,
    connectionState: 'connected',
    setQnConnectionState: () => undefined,
    qnConnectionState: 'connected',
  }

  return <ApiContext.Provider value={contextValue}>{<Story />}</ApiContext.Provider>
}

const setDefaultMock =
  (kind: keyof APIMock, api: Api, args: any, defaultWrapperFn: (x: any) => any = (x) => x) =>
  ({ path, value, get: _get, wrapperFn = defaultWrapperFn }: DefaultMock) => {
    if (isDefined(value)) {
      set(api[kind], path, wrapperFn(value))
    } else if (_get) {
      const [, modulePath, propName = path] = path.match(/(.+)\.([^.]+)/) ?? []
      if (!propName) return

      let module
      module = modulePath ? get(api[kind], modulePath) : api[kind]
      if (!module) {
        module = {}
        set(api[kind], modulePath, module)
      }

      Object.defineProperty(module, propName, { get: () => wrapperFn(_get(args)) })
    }
  }
