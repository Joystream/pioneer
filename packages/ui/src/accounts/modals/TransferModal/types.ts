import { ModalWithDataCall } from '../../../common/providers/modal/types'
import { Account } from '../../types'

export type TransferModalCall = ModalWithDataCall<'TransferTokens', { from?: Account; to?: Account }>
