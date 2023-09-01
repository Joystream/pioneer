import { AugmentedConsts, AugmentedQueries, AugmentedSubmittables } from '@polkadot/api/types'
import { RpcInterface } from '@polkadot/rpc-core/types'
import { Codec } from '@polkadot/types/types'
import { isArray, isFunction, isObject, mapValues, merge } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Observable, of } from 'rxjs'

import { Api } from '@/api'
import { ApiContext } from '@/api/providers/context'
import { UseApi } from '@/api/providers/provider'
import { warning } from '@/common/logger'
import { createType } from '@/common/model/createType'

import { asChainData } from '../helpers/asChainData'
import { TxMock, fromTxMock } from '../helpers/transactions'

export const BLOCK_HEAD = 1337
export const BLOCK_HASH = '0x1234567890'

type RecursiveMock<T extends Record<any, any>, R, V = any> = {
  [K in keyof T]?: T[K] extends R ? V : RecursiveMock<T[K], R, V>
}

type MockApi = {
  consts?: RecursiveMock<AugmentedConsts<'rxjs'>, Codec>
  derive?: RecursiveMock<Api['derive'], CallableFunction>
  query?: RecursiveMock<AugmentedQueries<'rxjs'>, CallableFunction>
  rpc?: RecursiveMock<RpcInterface, CallableFunction>
  tx?: RecursiveMock<AugmentedSubmittables<'rxjs'>, CallableFunction, TxMock>
}

export type MockApiProps = { chain?: MockApi }

export const MockApiProvider: FC<MockApiProps> = ({ children, chain }) => {
  // When changing mocks: updates the values by "disconnecting" the mocked api for a rendering frame.
  const [prevMocks, setPrevMocks] = useState(chain)
  useEffect(() => setPrevMocks(chain), [chain])

  const api = useMemo<Api | undefined>(() => {
    if (!chain) return

    // Common mocks:
    const rpcChain = {
      getBlockHash: createType('BlockHash', BLOCK_HASH),
      subscribeNewHeads: {
        parentHash: BLOCK_HASH,
        number: BLOCK_HEAD,
        stateRoot: BLOCK_HASH,
        extrinsicsRoot: BLOCK_HASH,
        digest: { logs: [] },
      },
    }

    const api = {
      _async: { chainMetadata: Promise.resolve({}) } as Api['_async'],
      isConnected: true,
      consts: asApi('consts', asApiConst),
      derive: asApi('derive', asApiMethod),
      query: asApi('query', asApiMethod),
      rpc: asApi('rpc', asApiMethod, { chain: rpcChain }),
      tx: asApi('tx', fromTxMock),
    }

    return watchForMissingProps(api, 'api') as Api

    function asApi<K extends keyof MockApi>(
      kind: K,
      fn: (value: any, moduleName: string) => any,
      common: MockApi[K] = {}
    ) {
      const chainData: MockApi[K] = merge(common, chain?.[kind])
      return mapValues(chainData, (moduleData, moduleName) => {
        const module = mapValues(moduleData, (value) => fn(value, moduleName))
        return watchForMissingProps(module, `${kind}.${moduleName}`)
      }) as Api[K]
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

const watchForMissingProps = <T extends Record<any, any>>(target: T, path: string): T =>
  new Proxy(target, {
    get(target, p) {
      const key = p as unknown as string
      if (!(key in target)) warning('Missing chain data:', `${path}.${key}`)
      return target[key]
    },
  })

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
  }

  const method = () => of(asChainData(value))

  if (isObject(value) && 'size' in value) {
    method.size = () => of(asChainData(value.size))
  }

  if (isObject(value) && 'entries' in value && isArray(value.entries)) {
    const entries = value.entries.map((entry) => [{ args: [asChainData(entry)] }])
    method.entries = () => of(entries)
  }

  return method
}
