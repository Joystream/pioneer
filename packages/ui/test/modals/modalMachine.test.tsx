import { createMachine, interpret } from 'xstate'

const formConfig = {
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

const transactionConfig = {
  id: 'transaction',
  initial: 'signer',
  states: {
    signer: {},
    signInternal: {},
    signWithExtension: {},
    pending: {},
    success: { type: 'final' },
    error: { type: 'final' },
  },
} as const

const stepperConfig = {
  id: 'stepper',
  initial: 'step1',
  states: {
    step1: {
      on: { NEXT: 'step2' },
    },
    step2: {
      ...formConfig,
      onDone: 'step3',
    },
    step3: {
      ...transactionConfig,
      onDone: 'step4',
    },
    step4: {
      type: 'final',
    },
  },
} as const

describe('Stepper machine', () => {
  const stepperMachine = createMachine(stepperConfig)

  it('Transition to step 2', () => {
    const stepperService = interpret(stepperMachine.withContext({}))
    stepperService.start()

    stepperService.send('NEXT')

    expect(stepperService.state.matches('step2')).toBeTruthy()
  })

  it('Transition to step 3 on done', () => {
    const stepperService = interpret(stepperMachine.withContext({}))
    stepperService.start()

    stepperService.send('NEXT')
    stepperService.send('INPUT')
    stepperService.send('VALID')
    stepperService.send('DONE')

    expect(stepperService.state.matches('step3')).toBeTruthy()
  })
})
