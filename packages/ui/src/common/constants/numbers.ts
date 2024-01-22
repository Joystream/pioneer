import BN from 'bn.js'

import { CHAIN_PROPERTIES } from '@/app/constants/chain'

export const JOY_DECIMAL_PLACES = CHAIN_PROPERTIES.tokenDecimals[0]

export const ED = new BN(10)
export const BN_ZERO = new BN(0)
export const SECONDS_PER_BLOCK = 6
export const ERA_DURATION = 21600000
export const ERAS_PER_DAY = 4
export const ERA_PER_MONTH = ERAS_PER_DAY * 30
export const ERAS_PER_YEAR = ERAS_PER_DAY * 365
export const ERA_DEPTH = 120
