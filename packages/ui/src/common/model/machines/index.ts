export * from './transaction'

export const formConfig = {
  id: 'form',
  initial: 'initial',
  states: {
    initial: {
      on: { INPUT: 'validating' },
    },
    validating: {
      on: {
        VALID: 'valid',
        INVALID: 'invalid',
      },
    },
    valid: {
      on: { INPUT: 'validating', DONE: 'done' },
    },
    invalid: {
      on: { INPUT: 'validating' },
    },
    done: { type: 'final' },
  },
} as const
