import { AugmentedConsts, AugmentedQueries, AugmentedSubmittables } from '@polkadot/api/types'
import { RpcInterface } from '@polkadot/rpc-core/types'
import { Codec } from '@polkadot/types/types'
import { isFunction, set } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Observable, of } from 'rxjs'

import { Api } from '@/api'
import { ApiContext } from '@/api/providers/context'
import { UseApi } from '@/api/providers/provider'
import { createType } from '@/common/model/createType'

import { joy } from '../helpers'
import { asChainData } from '../helpers/asChainData'
import { createSuccessEvents, stubTransactionResult } from '../helpers/transactions'

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
  tx?: RecursiveMock<AugmentedSubmittables<'rxjs'>, CallableFunction, { paymentInfo?: any; signAndSend?: any }>
}

export type MockApiProps = { chain?: MockApi }

export const MockApiProvider: FC<MockApiProps> = ({ children, chain }) => {
  // When changing mocks: updates the values by "disconnecting" the mocked api for a rendering frame.
  const [prevMocks, setPrevMocks] = useState(chain)
  useEffect(() => setPrevMocks(chain), [chain])

  const api = useMemo<Api | undefined>(() => {
    if (!chain) return

    // Add default mocks
    const blockHead = {
      parentHash: BLOCK_HASH,
      number: BLOCK_HEAD,
      stateRoot: BLOCK_HASH,
      extrinsicsRoot: BLOCK_HASH,
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
          getBlockHash: asApiMethod(createType('BlockHash', BLOCK_HASH)),
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
    traverseParams('tx', (path, { paymentInfo, signAndSend }, moduleName) => {
      set(api, path, () => {
        const event = createSuccessEvents(signAndSend ?? [], moduleName, 'EventName') // TODO pass the actual event name
        return {
          paymentInfo: asApiMethod({ partialFee: joy(paymentInfo ?? 5) }),
          signAndSend: () => signAndSend ?? stubTransactionResult(event),
        }
      })
    })

    return api

    function traverseParams(kind: keyof MockApi, fn: (path: string, value: any, moduleName: string) => any) {
      Object.entries(chain?.[kind] ?? {}).forEach(([moduleName, moduleParam]) =>
        Object.entries(moduleParam as Record<string, any>).forEach(([key, value]) =>
          fn(`${kind}.${moduleName}.${key}`, value, moduleName)
        )
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
