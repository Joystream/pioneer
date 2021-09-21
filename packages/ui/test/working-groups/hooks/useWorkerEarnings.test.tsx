import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import React from 'react'

import { seedApplication, seedEvent, seedMembers, seedOpening, seedWorker, seedWorkingGroups } from '@/mocks/data'
import { useWorkerEarnings } from '@/working-groups/hooks/useWorkerEarnings'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { OPENING_DATA, WORKER_DATA, APPLICATION_DATA } from '../../_mocks/server/seeds'

const renderUseEarnings = async (workerId: string) => {
  const { result, waitForNextUpdate } = renderHook(() => useWorkerEarnings(workerId), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
  while (result.current.isLoading) {
    await waitForNextUpdate()
  }
  return result.current
}
const baseEvent = {
  inBlock: 9487,
  createdAt: '2021-08-17T02:05:17.045Z',
  network: 'OLYMPIA',
  groupId: 'membershipWorkingGroup',
  type: 'REGULAR',
  rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
}

const rewardPaidEvents = [
  {
    ...baseEvent,
    workerId: 'forumWorkingGroup-1',
    amount: 4100,
  },
  {
    ...baseEvent,
    workerId: 'forumWorkingGroup-1',
    amount: 2300,
  },
  {
    ...baseEvent,
    workerId: 'forumWorkingGroup-2',
    amount: 2399,
  },
]

describe('useWorkerEarnings', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(() => {
    seedMembers(server.server, 1)
    seedWorkingGroups(server.server)
    seedOpening(OPENING_DATA, server.server)
    seedApplication({ ...APPLICATION_DATA, applicantId: '0' }, server.server)
    seedWorker(WORKER_DATA, server.server)
    seedWorker({ ...WORKER_DATA, id: 'forumWorkingGroup-2' }, server.server)
    rewardPaidEvents.map((event) => seedEvent(event, 'RewardPaidEvent', server.server))
  })

  it('Calculates earnings', async () => {
    const result = await renderUseEarnings('forumWorkingGroup-1')
    expect(result.earnings).toBeBN(new BN(6400))
  })
})
