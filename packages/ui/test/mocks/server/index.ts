import { Server } from 'miragejs/server'
import { makeServer } from '../../../src/mocks/server'
import { createMember, Members } from '../members'

interface MockServer {
  server?: Server
  createMember: (name: Members) => ReturnType<typeof createMember>
}

export function setupMockServer(): MockServer {
  const mock: MockServer = {
    createMember: (name) => createMember(mock.server!, name),
  }

  beforeEach(() => {
    mock.server = makeServer('test')
  })

  afterEach(() => {
    mock?.server?.shutdown()
  })

  return mock
}
