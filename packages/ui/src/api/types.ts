import { getPolkadotApiChainInfo } from 'injectweb3-connect'

import { Awaited } from '@/common/types/helpers'

export type MetadataDef = Awaited<ReturnType<typeof getPolkadotApiChainInfo>>
