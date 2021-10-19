import { AugmentedEvent } from '@polkadot/api/types'

export type ExtractTuple<P> = P extends AugmentedEvent<'rxjs', infer T> ? T : never
