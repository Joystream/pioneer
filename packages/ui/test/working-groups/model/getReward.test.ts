import { getReward } from '@/working-groups/model/getReward'

describe('getReward', () => {
  it('Example use', () => {
    const reward = getReward(2, 'forumWorkingGroup')
    expect(reward.payout.toNumber()).toEqual(28820)
    expect(reward.blockInterval).toEqual(14410)
  })
})
