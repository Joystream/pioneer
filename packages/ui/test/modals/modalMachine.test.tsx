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
  initial: 'signing',
  states: {
    signing: {
      on: {
        SIGN_INTERNAL: 'pending',
        SIGN_EXTERNAL: 'signWithExtension',
      },
    },
    signWithExtension: {
      on: {
        SIGNED: 'pending',
      },
    },
    pending: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
} as const

describe('Transaction machine', () => {
  const machine = createMachine(transactionConfig)
  let service: Interpreter<any>

  beforeEach(() => {
    service = interpret(machine)
    service.start()
  })

  it('Initial', () => {
    expect(service.state.matches('signing')).toBeTruthy()
  })

  it('Sign internal', () => {
    service.send('SIGN_INTERNAL')
    expect(service.state.matches('pending')).toBeTruthy()
  })

  it('Sign external', () => {
    service.send('SIGN_EXTERNAL')
    expect(service.state.matches('signWithExtension')).toBeTruthy()

    service.send('SIGNED')
    expect(service.state.matches('pending')).toBeTruthy()
  })

  it('Transaction success', () => {
    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS')

    expect(service.state.matches('success')).toBeTruthy()
  })

  it('Transaction error', () => {
    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('ERROR')

    expect(service.state.matches('error')).toBeTruthy()
  })
})

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
  const machine = createMachine({
    id: 'stepper',
    initial: 'step1',
    states: {
      step1: {
        on: { NEXT: 'form' },
      },
      form: {
        ...formConfig,
        onDone: 'transaction',
      },
      transaction: {
        ...transactionConfig,
        onDone: 'done',
      },
      done: {
        type: 'final',
      },
    },
  } as const)
  let service: Interpreter<any>

  beforeEach(() => {
    service = interpret(machine)
    service.start()
  })

  it('Standard step', () => {
    service.send('NEXT')

    expect(service.state.matches('form')).toBeTruthy()
  })

  it('Form step', () => {
    service.send('NEXT')
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    expect(service.state.matches('transaction')).toBeTruthy()
  })

  it('Transaction step', () => {
    service.send('NEXT')
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS')

    expect(service.state.matches('done')).toBeTruthy()
  })
})
