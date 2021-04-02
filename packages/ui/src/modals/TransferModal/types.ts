import { Account } from '../../common/types'
import { ModalWithDataCall } from '../../providers/modal/types'

export type TransferModalCall = ModalWithDataCall<'TransferTokens', { from?: Account; to?: Account }>
