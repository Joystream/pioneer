import { useGetRuntimeWasmBytecodeLazyQuery } from '../queries'
import { asRuntimeBytecode } from '../types'

export const useRuntimeBytecode = (id?: string) => {
  const where = { id: id ?? '' }
  const [fetch, { data, loading, called }] = useGetRuntimeWasmBytecodeLazyQuery({ variables: { where } })
  const runtimeBytecode = asRuntimeBytecode(data?.runtime)
  const runtimeBase64string =
    runtimeBytecode && Buffer.from(runtimeBytecode.bytecode.replace(/^0x/, ''), 'hex').toString('base64')
  return {
    state: getState(loading, called),
    runtimeBytecode,
    runtimeBase64string,
    fetch,
  }
}

function getState(loading: boolean, called: boolean): State {
  if (!called) return 'init'
  return loading ? 'loading' : 'loaded'
}

type State = 'init' | 'loading' | 'loaded'
