import { expect } from 'chai'
import { formatTokenValue, toChainTokenValue } from '../../src/utils/formatters'
import { BN_TEN, BN_THOUSAND } from '@polkadot/util'
import BN from 'bn.js'

const ONE_JOY = BN_TEN.pow(new BN(12))

describe('formatters', () => {
  describe('formatTokenValue', () => {
    it('Display token value with unit', () => {
      expect(formatTokenValue(ONE_JOY)).to.equal('1.0000 JOY')
      expect(formatTokenValue(ONE_JOY.mul(BN_THOUSAND))).to.equal('1.0000 kJOY')
    })
  })

  describe('toChainTokenValue', () => {
    it('Adjust value to chain', () => {
      expect(toChainTokenValue(1000).eq(ONE_JOY.mul(BN_THOUSAND))).to.be.true
    })
  })
})
