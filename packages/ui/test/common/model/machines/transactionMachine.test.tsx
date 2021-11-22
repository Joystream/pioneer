import { assign, createMachine, interpret, Interpreter } from 'xstate'

import { BN_ZERO } from '@/common/constants'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  TransactionEvent,
  transactionMachine,
} from '@/common/model/machines'

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

  it('Sign external', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    expect(service.state.matches('signWithExtension')).toBeTruthy()

    service.send('PENDING')
    expect(service.state.matches('pending')).toBeTruthy()

    service.send('FINALIZING')
    expect(service.state.matches('finalizing')).toBeTruthy()
  })

  it('Transaction success', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    service.send('PENDING')
    service.send('FINALIZING')
    service.send('PROCESSING')
    service.send('SUCCESS')

    expect(service.state.matches('success')).toBeTruthy()
  })

  it('Transaction error', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    service.send('PENDING')
    service.send('FINALIZING')
    service.send('PROCESSING')
    service.send('ERROR')

    expect(service.state.matches('error')).toBeTruthy()
  })

  it('Close extension while signing', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    service.send('CANCELED')

    expect(service.state.matches('canceled')).toBeTruthy()
  })

  it('Send events', () => {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    service.send('PENDING')
    service.send('FINALIZING', { fee: BN_ZERO })
    service.send('PROCESSING', { events: ['foo', 'bar'] })
    service.send('SUCCESS')

    expect(service.state.context).toEqual({
      events: ['foo', 'bar'],
      fee: BN_ZERO,
    })
  })

  describe('as child', () => {
    const parent = createMachine<any, any, any>({
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
              {
                target: 'canceled',
                cond: isTransactionCanceled,
              },
            ],
          },
        },
        success: { type: 'final' },
        error: { type: 'final' },
        canceled: { type: 'final' },
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
      child.send('PENDING')
      child.send({ type: 'FINALIZING', fee: BN_ZERO })
      child.send({ type: 'PROCESSING', events: ['foo', 'bar'] })
      child.send('SUCCESS')

      expect(service.state.matches('success')).toBeTruthy()
      expect(service.state.context).toEqual({ transactionEvents: ['foo', 'bar'], fee: BN_ZERO })
    })

    it('error', () => {
      const child = service.children.get('transaction')!
      child.send('SIGN')
      child.send('SIGN_EXTERNAL')
      child.send('PENDING')
      child.send('FINALIZING')
      child.send('PROCESSING')
      child.send({ type: 'ERROR', events: ['foo', 'bar'] })

      expect(service.state.matches('error')).toBeTruthy()
      expect(service.state.context).toEqual({ transactionEvents: ['foo', 'bar'] })
    })
  })
})
