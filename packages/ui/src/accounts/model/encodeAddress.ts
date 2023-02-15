import { encodeAddress as encode } from '@polkadot/util-crypto'

const JOYSTREAM_SS58_PREFIX = 126

export const encodeAddress = (key: Parameters<typeof encode>[0]) => encode(key, JOYSTREAM_SS58_PREFIX)
