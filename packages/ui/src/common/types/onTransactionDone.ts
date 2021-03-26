import { EventRecord } from '@polkadot/types/interfaces'
import BN from 'bn.js'

export type onTransactionDone = (success: boolean, events: EventRecord[], fee: BN) => void
