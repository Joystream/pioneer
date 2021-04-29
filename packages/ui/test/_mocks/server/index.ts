import { Server } from 'miragejs'

import { seedBlocks } from '../../../src/mocks/data'
import { fixAssociations, makeServer } from '../../../src/mocks/server'

interface MockServer {
  server?: Server
}

export function setupMockServer(): MockServer {
  const mock: MockServer = {}

  beforeEach(() => {
    mock.server = makeServer('test')
    fixAssociations((mock.server as unknown) as any)
    seedBlocks(mock.server)
  })

  afterEach(() => {
    mock?.server?.shutdown()
  })

  return mock
}
