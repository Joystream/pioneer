import { ApiRx } from '@polkadot/api'
import { AnyTuple } from '@polkadot/types/types'

import { recursiveProxy } from '@/common/utils/proxy'

import { ApiKinds } from '../types'

type ApiPath<K extends ApiKinds> = [keyof ApiRx[K], ...string[]]

export const apiInterfaceProxy = <K extends ApiKinds>(method: (...path: ApiPath<K>) => (...params: AnyTuple) => any) =>
  recursiveProxy({} as ApiRx[K], { get: (_, path) => method(...(path as ApiPath<K>)) })
