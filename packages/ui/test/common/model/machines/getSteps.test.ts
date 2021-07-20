import { assign, createMachine, interpret, Interpreter } from 'xstate'

import { getSteps } from '@/common/model/machines/getSteps'

describe('getSteps()', () => {
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
        { title: 'Step Multi', type: 'active' },
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

  describe('Complex conditional stepper', () => {
    const simpleStepper = createMachine({
      id: 'complex',
      initial: 'requirements',
      context: {
        type: '',
      },
      states: {
        requirements: {
          on: { DONE: 'step1' },
        },
        step1: {
          meta: { isStep: true, stepTitle: 'Step One' },
          on: {
            DONE: { target: 'multi', cond: (context) => !!context.type },
            CHOOSE_ALPHA: { actions: assign({ type: 'alpha' }) },
            CHOOSE_BETA: { actions: assign({ type: 'beta' }) },
          },
        },
        multi: {
          meta: { isStep: true, stepTitle: 'Step Multi' },
          initial: 'entry',
          on: {
            DONE: '#done',
          },
          states: {
            entry: {
              always: [
                { target: 'alpha', cond: ({ type }) => type === 'alpha' },
                { target: 'beta', cond: ({ type }) => type === 'beta' },
              ],
            },
            alpha: {
              on: {},
            },
            beta: {
              initial: 'one',
              states: {
                one: {
                  meta: { isStep: true, stepTitle: 'Step Beta One', cond: (c: any) => c.type === 'beta' },
                  on: { DONE: 'two' },
                },
                two: {
                  meta: { isStep: true, stepTitle: 'Step Beta Two', cond: (c: any) => c.type === 'beta' },
                },
              },
            },
          },
        },
        done: {
          id: 'done',
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
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Simple variant chosen', () => {
      service.send('DONE')
      service.send('CHOOSE_ALPHA')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Multi', type: 'active' },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Complex variant chosen', () => {
      service.send('DONE')
      service.send('CHOOSE_BETA')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Multi', type: 'active' },
        { title: 'Step Beta One', type: 'active', isBaby: true },
        { title: 'Step Beta Two', type: 'next', isBaby: true },
        { title: 'Step Done', type: 'next' },
      ])

      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Multi', type: 'active' },
        { title: 'Step Beta One', type: 'past', isBaby: true },
        { title: 'Step Beta Two', type: 'active', isBaby: true },
        { title: 'Step Done', type: 'next' },
      ])
    })

    it('Last step', () => {
      service.send('DONE')
      service.send('CHOOSE_ALPHA')
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Multi', type: 'past' },
        { title: 'Step Done', type: 'active' },
      ])
    })
  })

  describe('Complex conditional stepper (no final)', () => {
    const simpleStepper = createMachine({
      id: 'complex',
      initial: 'requirements',
      states: {
        requirements: {
          on: { DONE: 'step1' },
        },
        step1: {
          meta: { isStep: true, stepTitle: 'Step One' },
          on: {
            DONE: { target: 'multi' },
          },
        },
        multi: {
          meta: { isStep: true, stepTitle: 'Step Multi' },
          initial: 'alpha',
          on: {
            DONE: '#done',
          },
          states: {
            alpha: {},
          },
        },
        done: { id: 'done', type: 'final' },
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
      ])
    })

    it('In Multi step', () => {
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Multi', type: 'active' },
      ])
    })

    it('After last step', () => {
      service.send('DONE')
      service.send('DONE')
      service.send('DONE')

      expect(getSteps(service)).toEqual([
        { title: 'Step One', type: 'past' },
        { title: 'Step Multi', type: 'past' },
      ])
    })
  })
})
