import BN from 'bn.js'

import { blocksToTime } from '../../../src/common/model/blocksToTime'

describe('blocksToTime', () => {
  it('Less than one minute', () => {
    const blocks = new BN(0)
    expect(blocksToTime(blocks)).toEqual('less than a minute')
  })

  it('Negative number of blocks', () => {
    const blocks = new BN(-1)
    expect(blocksToTime(blocks)).toEqual('never')
  })

  it('a minute', () => {
    const blocks = new BN(9)
    expect(blocksToTime(blocks)).toEqual('1 minute')
  })

  it('two minutes', () => {
    const blocks = new BN(18)
    expect(blocksToTime(blocks)).toEqual('2 minutes')
  })
})
