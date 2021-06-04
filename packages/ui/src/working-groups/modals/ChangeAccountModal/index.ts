import { ModalWithDataCall } from '@/common/providers/modal/types'

import { ModalTypes } from './constants'

export * from './ChangeAccountModal'

export type ChangeAccountModalCall = ModalWithDataCall<'ChangeAccountModal', { workerId: string; type: ModalTypes }>
