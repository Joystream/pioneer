import { assign, createMachine, DoneInvokeEvent, EventObject, interpret, Interpreter } from 'xstate'

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
  context: {
    events: [],
  },
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
        SUCCESS: {
          target: 'success',
          actions: assign({
            events: (context, event: EventObject & { events: [] }) => event.events,
          }),
        },
        ERROR: 'error',
      },
    },
    success: {
      type: 'final',
      data: {
        events: (context: any, event: any) => event.events,
      },
    },
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

  it('Send events', () => {
    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS', { events: ['foo', 'bar'] })

    expect(service.state.context).toEqual({
      events: ['foo', 'bar'],
    })
  })
})

describe('Stepper with transaction machine', () => {
  const machine = createMachine({
    id: 'stepper',
    initial: 'step1',
    context: {
      transactionEvents: [],
    },
    states: {
      step1: {
        on: { NEXT: 'transaction' },
      },
      transaction: {
        invoke: {
          src: createMachine(transactionConfig),
          onDone: {
            actions: assign({
              transactionEvents: (context, event) => event.data.events,
            }),
            target: 'done',
          },
        },
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

  it('Transaction events', () => {
    service.send('NEXT')

    expect(service.state.matches('transaction')).toBeTruthy()

    const transaction = service.children.get('stepper.transaction:invocation[0]')!

    transaction.send('SIGN_EXTERNAL')
    transaction.send('SIGNED')
    ;(transaction.send as any)('SUCCESS', { events: ['foo', 'bar'] })

    expect(service.state.matches('done')).toBeTruthy()
    expect(service.state.context).toEqual({
      transactionEvents: ['foo', 'bar'],
    })
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

const isError = (event: DoneInvokeEvent<{ isError?: boolean }>) => !!event.data?.isError

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
        invoke: {
          id: 'foo',
          src: createMachine(transactionConfig),
          onDone: [
            {
              target: 'done',
              cond: (context, event) => !isError(event),
            },
            {
              target: 'error',
              cond: (context, event) => isError(event),
            },
          ],
        },
      },
      done: {
        type: 'final',
      },
      error: {
        type: 'final',
      },
    },
  })
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

    const child = service.children.get('stepper.transaction:invocation[0]')!

    child.send('SIGN_EXTERNAL')
    child.send('SIGNED')
    child.send('SUCCESS')

    expect(service.state.matches('done')).toBeTruthy()
  })

  it('Transaction error', () => {
    service.send('NEXT')
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    const child = service.children.get('stepper.transaction:invocation[0]')!

    child.send('SIGN_EXTERNAL')
    child.send('SIGNED')
    child.send('ERROR')

    expect(service.state.matches('error')).toBeTruthy()
  })
})

describe('Multi transaction machine', () => {
  const machine = createMachine({
    id: 'stepper',
    initial: 'form1',
    states: {
      form1: {
        ...formConfig,
        onDone: 'transaction1',
      },
      transaction1: {
        ...transactionConfig,
        onDone: [
          {
            target: 'error',
            in: 'transaction1.error',
          },
          {
            target: 'form2',
            in: 'transaction1.success',
          },
        ],
      },
      form2: {
        ...formConfig,
        onDone: 'transaction2',
      },
      transaction2: {
        ...transactionConfig,
        onDone: [
          {
            target: 'error',
            in: 'transaction2.error',
          },
          {
            target: 'done',
            in: 'transaction2.success',
          },
        ],
      },
      error: {
        type: 'final',
      },
      done: {
        type: 'final',
      },
    },
  })
  let service: Interpreter<any>

  beforeEach(() => {
    service = interpret(machine)
    service.start()
  })

  it('Form 1 step', () => {
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    expect(service.state.matches('transaction1')).toBeTruthy()
  })

  it('Transaction 1 step', () => {
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS')

    expect(service.state.matches('form2')).toBeTruthy()
  })

  it('Transaction 1 error', () => {
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('ERROR')

    expect(service.state.matches('error')).toBeTruthy()
  })

  it('Form 2 step', () => {
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS')

    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    expect(service.state.matches('transaction2')).toBeTruthy()
  })

  it('Transaction 2 error', () => {
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS')

    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('ERROR')

    expect(service.state.matches('error')).toBeTruthy()
  })

  it('Success', () => {
    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS')

    service.send('INPUT')
    service.send('VALID')
    service.send('DONE')

    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS')

    expect(service.state.matches('done')).toBeTruthy()
  })
})
