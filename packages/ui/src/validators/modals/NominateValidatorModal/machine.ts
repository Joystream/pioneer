import { createMachine } from 'xstate'

interface NominateContext {
  transactionEvents?: any[]
}

export const nominateMachine = createMachine<NominateContext>({
  id: 'nominate',
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        NEXT: 'transaction',
      },
    },
    transaction: {
      on: {
        FAIL: 'error',
        SUCCESS: 'success',
      },
    },
    success: {
      type: 'final',
    },
    error: {
      on: {
        RETRY: 'transaction',
      },
    },
  },
})
