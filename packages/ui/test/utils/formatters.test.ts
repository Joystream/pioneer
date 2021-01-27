import { expect } from 'chai'
import { formatTokenValue } from '../../src/utils/formatters'
import { BN_THOUSAND } from '@polkadot/util'
import BN from 'bn.js'

const JOY_1 = new BN(1)

describe('formatters', () => {
  describe('formatTokenValue', () => {
    it('Display token value with unit', () => {
      expect(formatTokenValue(JOY_1)).to.equal('1.0000 JOY')
      expect(formatTokenValue(JOY_1.mul(BN_THOUSAND))).to.equal('1.0000 kJOY')
    })
  })
})
