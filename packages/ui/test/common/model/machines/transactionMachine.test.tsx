import { assign, createMachine, interpret, Interpreter } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'

describe('Machine: Transaction machine', () => {
  let service: Interpreter<any>

  beforeEach(() => {
    service = interpret(transactionMachine)
    service.start()
  })

  it('Initial', () => {
    expect(service.state.matches('prepare')).toBeTruthy()
  })

  it('Sign', () => {
    service.send('SIGN')
    expect(service.state.matches('signing')).toBeTruthy()
  })

  it('Sign internal', () => {
    service.send('SIGN')
    service.send('SIGN_INTERNAL')
    expect(service.state.matches('pending')).toBeTruthy()
  })

  it('Sign external', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    expect(service.state.matches('signWithExtension')).toBeTruthy()

    service.send('SIGNED')
    expect(service.state.matches('pending')).toBeTruthy()
  })

  it('Transaction success', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS')

    expect(service.state.matches('success')).toBeTruthy()
  })

  it('Transaction error', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('ERROR')

    expect(service.state.matches('error')).toBeTruthy()
  })

  it('Send events', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
    service.send('SUCCESS', { events: ['foo', 'bar'] })

    expect(service.state.context).toEqual({
      events: ['foo', 'bar'],
    })
  })

  describe('as child', () => {
    const parent = createMachine({
      id: 'parent',
      initial: 'transaction',
      context: {
        transactionEvents: [],
      },
      states: {
        transaction: {
          invoke: {
            id: 'transaction',
            src: transactionMachine,
            onDone: [
              {
                target: 'success',
                actions: assign({
                  transactionEvents: (context, event) => event.data.events,
                  fee: (context, event) => event.data.fee,
                }),
                cond: isTransactionSuccess,
              },
              {
                target: 'error',
                actions: assign({
                  transactionEvents: (context, event) => event.data.events,
                  fee: (context, event) => event.data.fee,
                }),
                cond: isTransactionError,
              },
            ],
          },
        },
        success: { type: 'final' },
        error: { type: 'final' },
      },
    })
    let service: Interpreter<any>

    beforeEach(() => {
      service = interpret(parent)
      service.start()
    })

    it('success', () => {
      const child = service.children.get('transaction')!
      child.send('SIGN')
      child.send('SIGN_EXTERNAL')
      child.send('SIGNED')
      child.send({ type: 'SUCCESS', events: ['foo', 'bar'] })

      expect(service.state.matches('success')).toBeTruthy()
      expect(service.state.context).toEqual({ transactionEvents: ['foo', 'bar'] })
    })

    it('error', () => {
      const child = service.children.get('transaction')!
      child.send('SIGN')
      child.send('SIGN_EXTERNAL')
      child.send('SIGNED')
      child.send({ type: 'ERROR', events: ['foo', 'bar'] })

      expect(service.state.matches('error')).toBeTruthy()
      expect(service.state.context).toEqual({ transactionEvents: ['foo', 'bar'] })
    })
  })

  describe('Multi transaction', () => {
    const multi = createMachine({
      context: {
        transactions: ['firstTransaction'],
      },
      states: {
        transaction: {
          on: {
            DONE: {
              target: 'success',
              cond: (context: any) => context.transactions.length === 1,
              actions: assign({
                transactions: (context: any) => {
                  context.transactions.pop()
                  return context.transactions
                },
              }),
            },
          },
        },
        success: {},
      },
      initial: 'transaction',
    })

    let service: Interpreter<any>

    beforeEach(() => {
      service = interpret(multi)
      service.start()
    })

    it('start', () => {
      expect(service.state.matches('transaction')).toBeTruthy()
    })

    it('goes to next state when no more transactions', () => {
      service.send('DONE')
      expect(service.state.matches('success')).toBeTruthy()
    })

    it('stays in transaction when some transactions left', () => {
      service = interpret(multi, { context: { transactions: ['first', 'second'] } })
      service.start()
      service.send('DONE')
      expect(service.state.matches('transaction')).toBeTruthy()
    })
  })
})
