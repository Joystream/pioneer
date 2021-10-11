import { createMachine } from 'xstate'

import { EmptyObject } from '@/common/types'

export type WithdrawCandidacyState = { value: 'warning'; context: EmptyObject }

type WithdrawCandidacyEvent = { type: 'NEXT' }

type WithdrawCandidacyContext = EmptyObject

export const machine = createMachine<WithdrawCandidacyContext, WithdrawCandidacyEvent, WithdrawCandidacyState>({
  initial: 'warning',
  context: {},
  states: {
    warning: {},
  },
})
