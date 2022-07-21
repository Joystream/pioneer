import { createType } from '../createType'

export type AnyMessage<T> = T & {
  toJSON(): Record<string, unknown>
}

export type AnyMetadataClass<T> = {
  decode(binary: Uint8Array): AnyMessage<T>
  encode(obj: T): { finish(): Uint8Array }
  toObject(obj: AnyMessage<T>): Record<string, unknown>
}

export const metadataToBytes = <T extends any>(metaClass: AnyMetadataClass<T>, message: T) => {
  return createType('Bytes', '0x' + Buffer.from(metaClass.encode(message).finish()).toString('hex'))
}
