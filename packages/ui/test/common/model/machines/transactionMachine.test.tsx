import { assign, createMachine, interpret, Interpreter } from 'xstate'

import { isTransactionError, isTransactionSuccess, TransactionEvent, transactionMachine } from '@/common/model/machines'
import {
  MultiTransactionEvent,
  multiTransaction,
  MultiTransactionContext,
  MultiTransactionState,
} from '@/common/model/machines/multiTransaction'

describe('Machine: Transaction machine', () => {
  let service: Interpreter<any, any, TransactionEvent, any>

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
    let service: Interpreter<MultiTransactionContext, any, MultiTransactionEvent, MultiTransactionState>

    beforeEach(() => {
      service = interpret(multiTransaction.withContext({ transactions: ['firstTransaction'] }))
      service.start()
    })

    it('start', () => {
      expect(service.state.matches('transactions')).toBeTruthy()
    })

    it('goes to next state when no more transactions', () => {
      service.send('DONE')
      expect(service.state.matches('success')).toBeTruthy()
    })

    it('stays in transaction when some transactions left', () => {
      service = interpret(multiTransaction.withContext({ transactions: ['first', 'second'] }))
      service.start()
      service.send('DONE')
      expect(service.state.matches('transactions')).toBeTruthy()
    })
  })
})
