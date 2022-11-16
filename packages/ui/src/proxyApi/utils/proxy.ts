import { AnyTuple } from '@polkadot/types/types'

import { recursiveProxy } from '@/common/utils/proxy'

import { ProxyApi } from '..'
import { ApiKinds } from '../types'

type ApiPath<K extends ApiKinds> = [keyof ProxyApi[K], ...string[]]
export const apiInterfaceProxy = <K extends ApiKinds>(method: (...path: ApiPath<K>) => (...params: AnyTuple) => any) =>
  recursiveProxy({} as ProxyApi[K], { get: ({ path }) => method(...(path as ApiPath<K>)) })
