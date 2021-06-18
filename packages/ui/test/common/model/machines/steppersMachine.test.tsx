import { createMachine, interpret, Interpreter, State, StateNode } from 'xstate'

import { formConfig, transactionConfig } from '@/common/model/machines'

interface Step {
  title: string
  type: 'past' | 'active' | 'next'
  isBaby?: boolean
}

const getActiveNodeOrder = (state: State<any>) => (activeId: number, stateNode: StateNode) => {
  if (state.matches(stateNode.path.join('.'))) {
    return stateNode.order
  }

  return activeId
}

const getSteps = (service: Interpreter<any>): Step[] => {
  const machine = service.machine
  const stateNodes = machine.stateIds.map((id) => machine.getStateNodeById(id))
  const activeNodeOrder = stateNodes.reduce(getActiveNodeOrder(service.state), -1)

  return stateNodes
    .filter((stateNode) => !!stateNode?.meta?.isStep)
    .map((stateNode) => {
      return {
        title: stateNode?.meta?.stepTitle ?? '',
        type: stateNode.order === activeNodeOrder ? 'active' : stateNode.order < activeNodeOrder ? 'past' : 'next',
        ...(stateNode.parent?.meta?.isStep ? { isBaby: true } : undefined),
      }
    })
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

  describe('Simple Stepper', () => {
    const simpleStepper = createMachine({
      id: 'simple',
      initial: 'requirements',
      states: {
        requirements: {
          on: { DONE: 'step1' },
        },
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
      service.start()
    })

    it('Steps from machine', () => {
      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'next' },
        { title: 'Step Two', type: 'next' },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Active step', () => {
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'active' },
        { title: 'Step Two', type: 'next' },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Active and past step', () => {
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Two', type: 'active' },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Last step', () => {
      service.send('DONE')
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Two', type: 'past' },
        { title: 'Step Done', type: 'active' },
      ])
    })
  })

  describe('Simple Stepper with gaps', () => {
    const gapStepper = createMachine({
      id: 'simpleWithGaps',
      initial: 'requirements',
      states: {
        requirements: {
          on: { DONE: 'step1' },
        },
        step1: {
          meta: { isStep: true, stepTitle: 'Step One' },
          on: { DONE: 'step2' },
        },
        step2: {
          meta: { isStep: true, stepTitle: 'Step Two' },
          on: { DONE: 'gap' },
        },
        gap: {
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
      service = interpret(gapStepper)
      service.start()
    })

    it('Steps from machine', () => {
      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'next' },
        { title: 'Step Two', type: 'next' },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Active step', () => {
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'active' },
        { title: 'Step Two', type: 'next' },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Gap step', () => {
      service.send('DONE')
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Two', type: 'past' },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Last step', () => {
      service.send('DONE')
      service.send('DONE')
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Two', type: 'past' },
        { title: 'Step Done', type: 'active' },
      ])
    })
  })

  describe('Complex stepper', () => {
    const simpleStepper = createMachine({
      id: 'complex',
      initial: 'requirements',
      states: {
        requirements: {
          on: { DONE: 'step1' },
        },
        step1: {
          meta: { isStep: true, stepTitle: 'Step One' },
          on: { DONE: 'multi' },
        },
        multi: {
          meta: { isStep: true, stepTitle: 'Step Multi' },
          initial: 'multi1',
          states: {
            multi1: { on: { DONE: 'multi2' }, meta: { isStep: true, stepTitle: 'Step Multi 1' } },
            multi2: { on: { DONE: 'multiDone' }, meta: { isStep: true, stepTitle: 'Step Multi 2' } },
            multiDone: { type: 'final' },
          },
          onDone: 'done',
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
      service.start()
    })

    it('Steps from machine', () => {
      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'next' },
        { title: 'Step Multi', type: 'next' },
        { title: 'Step Multi 1', type: 'next', isBaby: true },
        { title: 'Step Multi 2', type: 'next', isBaby: true },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Active baby step', () => {
      service.send('DONE')
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Multi', type: 'past' },
        { title: 'Step Multi 1', type: 'past', isBaby: true },
        { title: 'Step Multi 2', type: 'active', isBaby: true },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Last step', () => {
      service.send('DONE')
      service.send('DONE')
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Multi', type: 'past' },
        { title: 'Step Multi 1', type: 'past', isBaby: true },
        { title: 'Step Multi 2', type: 'past', isBaby: true },
        { title: 'Step Done', type: 'active' },
      ])
    })
  })
})
