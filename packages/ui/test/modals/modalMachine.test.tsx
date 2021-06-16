import { createMachine, interpret, Interpreter } from 'xstate'

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

describe('Form machine', () => {
  const machine = createMachine(formConfig)
  let service: Interpreter<any>

  beforeEach(() => {
    service = interpret(machine)
    service.start()
  })

  it('Initial', () => {
    expect(service.state.matches('initial')).toBeTruthy()
  })

  it('Validating', () => {
    service.send('INPUT')

    expect(service.state.matches('validating')).toBeTruthy()
  })

  it('Valid', () => {
    service.send('INPUT')
    service.send('VALID')

    expect(service.state.matches('valid')).toBeTruthy()
  })

  it('Invalid', () => {
    service.send('INPUT')
    service.send('INVALID')

    expect(service.state.matches('invalid')).toBeTruthy()
  })

  it('Done', () => {
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    expect(service.state.matches('done')).toBeTruthy()
  })
})

describe('Stepper machine', () => {
  const machine = createMachine(stepperConfig)
  let service: Interpreter<any>

  beforeEach(() => {
    service = interpret(machine)
    service.start()
  })

  it('Transition to step 2', () => {
    service.send('NEXT')

    expect(service.state.matches('step2')).toBeTruthy()
  })

  it('Transition to step 3 on done', () => {
    service.send('NEXT')
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    expect(service.state.matches('step3')).toBeTruthy()
  })
})
