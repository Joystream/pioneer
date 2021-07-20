import { useGetRuntimeWasmBytecodeQuery } from '../queries'
import { asRuntimeBytecode } from '../types'

export const useRuntimeBytecode = (id: string) => {
  const where = { id }
  const { data, loading } = useGetRuntimeWasmBytecodeQuery({ variables: { where } })
  const runtimeBytecode = asRuntimeBytecode(data?.runtime)
  return { isLoading: loading, runtimeBytecode }
}
