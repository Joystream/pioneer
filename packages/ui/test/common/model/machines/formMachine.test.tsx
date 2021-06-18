import { createMachine, interpret, Interpreter } from 'xstate'

import { formConfig } from '@/common/model/machines'

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
