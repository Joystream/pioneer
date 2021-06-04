import BN from 'bn.js'

import { getNextPayout } from '../../../src/working-groups/model/getNextPayout'

describe('getNextPayout', () => {
  it('Single role', () => {
    const blockNumber = new BN(14400)
    const workers = ['forum'].map(toWorkerFragment)
    expect(getNextPayout(workers, blockNumber)?.toNumber()).toEqual(10)
  })

  it('No roles', () => {
    const blockNumber = new BN(14400)
    const workers = [].map(toWorkerFragment)
    expect(getNextPayout(workers, blockNumber)).toBeUndefined()
  })

  it('Multiple roles', () => {
    const blockNumber = new BN(14400)
    const workers1 = ['forum', 'storage', 'content'].map(toWorkerFragment)
    expect(getNextPayout(workers1, blockNumber)?.toNumber()).toEqual(10)
    const workers2 = ['storage', 'content'].map(toWorkerFragment)
    expect(getNextPayout(workers2, blockNumber)?.toNumber()).toEqual(20)
  })

  it('Later block', () => {
    const blockNumber = new BN(14400 * 2)
    const workers = ['forum', 'storage', 'content'].map(toWorkerFragment)
    expect(getNextPayout(workers, blockNumber)?.toNumber()).toEqual(20)
  })

  const toWorkerFragment = (groupName: string) => ({
    group: {
      id: '',
      name: groupName,
    },
  })
})
