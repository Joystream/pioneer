import { GetRuntimeWasmBytecodeQuery } from '../queries'

export interface RuntimeBytecode {
  id: string
  bytecode: ArrayBuffer
}

export const asRuntimeBytecode = (bytecode: GetRuntimeWasmBytecodeQuery['runtime']): RuntimeBytecode | undefined => {
  return bytecode
    ? {
        id: bytecode.id,
        bytecode: bytecode.bytecode,
      }
    : undefined
}
