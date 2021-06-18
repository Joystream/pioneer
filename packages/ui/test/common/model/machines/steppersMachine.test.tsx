import { createMachine, interpret, Interpreter, StateMachine } from 'xstate'

import { formConfig, transactionConfig } from '@/common/model/machines'

interface Step {
  title: string
}

const getSteps = (machine: StateMachine<any, any, any>): Step[] => {
  return machine.stateIds
    .map((id) => machine.getStateNodeById(id))
    .filter((stateNode) => !!stateNode?.meta?.isStep)
    .map((stateNode) => ({
      title: stateNode?.meta?.stepTitle ?? '',
    }))
}

describe('Machine: Steppers', () => {
  describe('Form with transaction', () => {
    const INVOKE_NAME = 'transaction'
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
            id: INVOKE_NAME,
            src: createMachine(transactionConfig),
            onDone: [
              {
                target: 'done',
                cond: (context, event) => event.data.events.length,
              },
              {
                target: 'error',
                cond: (context, event) => !event.data.events.length,
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

      const child = service.children.get(INVOKE_NAME)!

      child.send('SIGN')
      child.send('SIGN_EXTERNAL')
      child.send('SIGNED')
      child.send({ type: 'SUCCESS', events: ['foo'] })

      expect(service.state.matches('done')).toBeTruthy()
    })

    it('Transaction error', () => {
      service.send('NEXT')
      service.send('INPUT')
      service.send('VALID')
      service.send('DONE')

      const child = service.children.get(INVOKE_NAME)!

      child.send('SIGN')
      child.send('SIGN_EXTERNAL')
      child.send('SIGNED')
      child.send({ type: 'ERROR', events: [] })

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
          // TODO: use invoke
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

      service.send('SIGN')
      service.send('SIGN_EXTERNAL')
      service.send('SIGNED')
      service.send('SUCCESS')

      expect(service.state.matches('form2')).toBeTruthy()
    })

    it('Transaction 1 error', () => {
      service.send('INPUT')
      service.send('VALID')
      service.send('DONE')

      service.send('SIGN')
      service.send('SIGN_EXTERNAL')
      service.send('SIGNED')
      service.send('ERROR')

      expect(service.state.matches('error')).toBeTruthy()
    })

    it('Form 2 step', () => {
      service.send('INPUT')
      service.send('VALID')
      service.send('DONE')

      service.send('SIGN')
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

      service.send('SIGN')
      service.send('SIGN_EXTERNAL')
      service.send('SIGNED')
      service.send('SUCCESS')

      service.send('INPUT')
      service.send('VALID')
      service.send('DONE')

      service.send('SIGN')
      service.send('SIGN_EXTERNAL')
      service.send('SIGNED')
      service.send('ERROR')

      expect(service.state.matches('error')).toBeTruthy()
    })

    it('Success', () => {
      service.send('INPUT')
      service.send('VALID')
      service.send('DONE')

      service.send('SIGN')
      service.send('SIGN_EXTERNAL')
      service.send('SIGNED')
      service.send('SUCCESS')

      service.send('INPUT')
      service.send('VALID')
      service.send('DONE')

      service.send('SIGN')
      service.send('SIGN_EXTERNAL')
      service.send('SIGNED')
      service.send('SUCCESS')

      expect(service.state.matches('done')).toBeTruthy()
    })
  })

  describe('Stepper', () => {
    const simpleStepper = createMachine({
      id: 'simple',
      states: {
        requirements: { on: { DONE: 'step1' } },
        step1: {
          meta: { isStep: true, stepTitle: 'Step One' },
          on: { DONE: 'step2' },
        },
        step2: {
          meta: { isStep: true, stepTitle: 'Step Two' },
          on: { DONE: 'done' },
        },
        done: {
          meta: { isStep: true, stepTitle: 'Step Done' },
          type: 'final',
        },
      },
    })
    let service: Interpreter<any>

    beforeEach(() => {
      service = interpret(simpleStepper)
    })

    it('Steps from machine', () => {
      expect(getSteps(service.machine)).toEqual([{ title: 'Step One' }, { title: 'Step Two' }, { title: 'Step Done' }])
    })
  })
})
