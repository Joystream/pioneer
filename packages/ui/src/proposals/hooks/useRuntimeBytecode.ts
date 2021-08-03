import { useGetRuntimeWasmBytecodeLazyQuery } from '../queries'
import { asRuntimeBytecode } from '../types'

export const useRuntimeBytecode = (id?: string) => {
  const where = { id: id ?? '' }
  const [fetch, { data, loading, called }] = useGetRuntimeWasmBytecodeLazyQuery({ variables: { where } })
  const runtimeBytecode = asRuntimeBytecode(data?.runtime)
  return {
    state: getState(loading, called),
    runtimeBytecode,
    fetch,
  }
}

function getState(loading: boolean, called: boolean): State {
  if (!called) return 'init'
  return loading ? 'loading' : 'loaded'
}

type State = 'init' | 'loading' | 'loaded'
