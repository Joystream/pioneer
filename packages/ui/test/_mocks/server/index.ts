import { Server } from 'miragejs'

import { fixAssociations, makeServer } from '@/mocks/server'

interface MockServer {
  server?: Server
}

interface Props {
  noCleanupAfterEach: boolean
}

export function setupMockServer(props?: Props): MockServer {
  const mock: MockServer = {}

  beforeAll(() => {
    mock.server = makeServer('test')
    fixAssociations(mock.server as unknown as any)
  })

  if (!props?.noCleanupAfterEach) {
    afterEach(() => {
      mock?.server?.db.emptyData()
    })
  }

  afterAll(() => {
    mock?.server?.shutdown()
  })

  return mock
}
