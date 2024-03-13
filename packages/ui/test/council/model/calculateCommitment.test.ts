import { calculateCommitment } from '@/council/model/calculateCommitment'

import { accountsMap } from '../../../dev/node-mocks/data/addresses'

const TEST_SALT = '0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a'
const ALICE_VOTE_COMMITMENT = '0x3db26e2bd023ccf2d1167fd42d48cc76b1c1e5c1de9003f61e63ec6a337b91a2'
const BOB_VOTE_COMMITMENT = '0xf94e151db1bbcd27018ee12400b05b8d5ad495dc8d481421fdc366639d42be75'

it('Model: calculateCommitment', () => {
  expect(calculateCommitment(accountsMap.alice, '0', TEST_SALT, 1)).toBe(ALICE_VOTE_COMMITMENT)
  expect(calculateCommitment(accountsMap.bob, '0', TEST_SALT, 1)).toBe(BOB_VOTE_COMMITMENT)
})
