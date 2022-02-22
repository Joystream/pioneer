import { AnyMessage, AnyMetadataClass, DecodedMetadataObject } from '@joystream/metadata-protobuf/types'
import { Bytes } from '@polkadot/types/primitive'

function metaToObject<T>(metaClass: AnyMetadataClass<T>, value: AnyMessage<T>) {
  return metaClass.toObject(value, { arrays: false, longs: String }) as DecodedMetadataObject<T>
}

// From https://github.com/Joystream/joystream/blob/0977a2b5ccc08b16416f0ed8eed74cdbc9495be0/cli/src/helpers/serialization.ts

export function metadataFromBytes<T>(metaClass: AnyMetadataClass<T>, bytes: Bytes): DecodedMetadataObject<T> {
  return metaToObject(metaClass, metaClass.decode(bytes.toU8a(true)))
}
