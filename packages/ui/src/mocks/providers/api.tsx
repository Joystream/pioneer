import { isFunction, set } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Observable, of } from 'rxjs'

import { Api } from '@/api'
import { ApiContext } from '@/api/providers/context'
import { UseApi } from '@/api/providers/provider'
import { createType } from '@/common/model/createType'

import { joy } from '../helpers'
import { asChainData } from '../helpers/asChainData'

type MockApi = {
  consts?: Record<string, any>
  derive?: Record<string, any>
  query?: Record<string, any>
  rpc?: Record<string, any>
  tx?: Record<string, { paymentInfo?: any; signAndSend?: any }>
}

export type MockApiProps = { chain?: MockApi }

export const MockApiProvider: FC<MockApiProps> = ({ children, chain }) => {
  // When changing mocks: updates the values by "disconnecting" the mocked api for a rendering frame.
  const [prevMocks, setPrevMocks] = useState(chain)
  useEffect(() => setPrevMocks(chain), [chain])

  const api = useMemo<Api | undefined>(() => {
    if (!chain) return

    // Add default mocks
    const blockHash = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
    const blockHead = {
      parentHash: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      number: 1337,
      stateRoot: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      extrinsicsRoot: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      digest: { logs: [] },
    }

    const api = {
      _async: { chainMetadata: Promise.resolve({}) },
      isConnected: true,
      consts: {},
      derive: {},
      query: {},
      rpc: {
        chain: {
          getBlockHash: asApiMethod(createType('BlockHash', blockHash)),
          subscribeNewHeads: asApiMethod(createType('Header', blockHead)),
        },
      },
      tx: {},
    } as Api

    // Add mocks from parameters
    traverseParams('consts', (path, value) => set(api, path, asApiConst(value)))
    traverseParams('derive', (path, value) => set(api, path, asApiMethod(value)))
    traverseParams('query', (path, value) => set(api, path, asApiMethod(value)))
    traverseParams('rpc', (path, value) => set(api, path, asApiMethod(value)))
    traverseParams('tx', (path, { paymentInfo, signAndSend }) => {
      set(api.tx, `${path}.paymentInfo`, asApiMethod(paymentInfo ?? joy(5)))
      set(api.tx, `${path}.signAndSend`, asApiMethod(signAndSend ?? undefined))
    })

    return api

    function traverseParams(kind: keyof MockApi, fn: (path: string, value: any) => any) {
      Object.entries(chain?.[kind] ?? {}).forEach(([moduleName, moduleParam]) =>
        Object.entries(moduleParam).forEach(([key, value]) => fn(`${kind}.${moduleName}.${key}`, value))
      )
    }
  }, [chain])

  // Set context
  const contextValue: UseApi =
    api && chain === prevMocks
      ? {
          api,
          isConnected: true,
          connectionState: 'connected',
          setQnConnectionState: () => undefined,
          qnConnectionState: 'connected',
        }
      : {
          api: undefined,
          isConnected: false,
          connectionState: 'connecting',
          setQnConnectionState: () => undefined,
          qnConnectionState: 'connecting',
        }

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
}

const asApiConst = (value: any) => {
  if (isFunction(value)) {
    return value()
  } else {
    return asChainData(value)
  }
}
const asApiMethod = (value: any) => {
  if (isFunction(value)) {
    return value
  } else if (value instanceof Observable) {
    return () => value
  } else {
    return () => of(asChainData(value))
  }
}
