import { memoize } from 'lodash'

export const asArrayBuffer = memoize((file?: File) => file?.arrayBuffer() ?? new ArrayBuffer(0))
