import { encodeAddress as encode } from '@polkadot/util-crypto'

import { CHAIN_PROPERTIES } from '@/app/constants/chain'

export const encodeAddress = (key: Parameters<typeof encode>[0]) => encode(key, CHAIN_PROPERTIES.ss58Format)
