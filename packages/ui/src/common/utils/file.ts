import { memoize } from 'lodash'

export const asUint8Array = memoize(async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  return new Uint8Array(arrayBuffer)
})
