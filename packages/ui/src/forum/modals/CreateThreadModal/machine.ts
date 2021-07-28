import { createMachine, assign } from 'xstate'

import { EmptyObject } from '@/common/types'

export interface GeneralFormContext {
  topic: string
  description: string
}

type TransactionContext = Required<GeneralFormContext>

type CreateThreadContext = Partial<TransactionContext>

type CreateThreadState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'generalDetails'; context: GeneralFormContext }
  | { value: 'end'; context: TransactionContext }

export type CreateThreadEvent =
  | { type: 'FAIL' }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SET_TOPIC'; topic: string }
  | { type: 'SET_DESCRIPTION'; description: string }

export const createThreadMachine = createMachine<CreateThreadContext, CreateThreadEvent, CreateThreadState>({
  initial: 'requirementsVerification',
  context: {
    topic: '',
    description: '',
  },
  states: {
    requirementsVerification: {
      on: {
        NEXT: 'generalDetails',
        FAIL: 'requirementsFailed',
      },
    },
    requirementsFailed: { type: 'final' },
    generalDetails: {
      on: {
        NEXT: {
          target: 'end',
          cond: (context) => !!(context['topic'] && context['description']),
        },
        SET_TOPIC: {
          actions: assign({
            topic: (_, event) => event.topic,
          }),
        },
        SET_DESCRIPTION: {
          actions: assign({
            description: (_, event) => event.description,
          }),
        },
      },
    },
    end: { type: 'final' },
  },
})
