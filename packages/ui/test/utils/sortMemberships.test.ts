import { BaseMember } from '../../src/common/types'
import BN from 'bn.js'
import { sortMemberships } from '../../src/utils/sortMemberships'

describe('sortMemberships', () => {
  const template = {
    id: '1',
    rootAccount: '',
    controllerAccount: '',
    name: '',
    about: '',
    isFoundingMember: false,
    isVerified: true,
    inviteCount: new BN(0),
  }

  describe('By handle', () => {
    const alice: BaseMember = { ...template, handle: 'alice' }
    const bob: BaseMember = { ...template, handle: 'bob' }
    const bob2: BaseMember = { ...template, handle: 'bob', inviteCount: new BN(10) }
    const charlie: BaseMember = { ...template, handle: 'charlie' }
    const david: BaseMember = { ...template, handle: 'david' }

    it('Alphabetical order', () => {
      expect(sortMemberships([david, bob, alice, bob2, charlie], 'handle', false)).toEqual([
        alice,
        bob,
        bob2,
        charlie,
        david,
      ])
    })

    it('Reversed alphabetical order', () => {
      expect(sortMemberships([david, alice, bob, charlie, bob2], 'handle', true)).toEqual([
        david,
        charlie,
        bob,
        bob2,
        alice,
      ])
    })

    const undef0: BaseMember = { ...template }
    const undef1: BaseMember = { ...template }

    it('With undefined', () => {
      expect(sortMemberships([alice, undef0, david, bob, undef1], 'handle')).toEqual([
        undef0,
        undef1,
        alice,
        bob,
        david,
      ])
    })
  })

  describe('By invite number', () => {
    const alice: BaseMember = { ...template, inviteCount: new BN(1) }
    const bob: BaseMember = { ...template, inviteCount: new BN(2) }
    const charlie: BaseMember = { ...template, inviteCount: new BN(2) }
    const david: BaseMember = { ...template, inviteCount: new BN(3) }

    it('Ascending', () => {
      expect(sortMemberships([david, alice, charlie, bob], 'inviteCount', false)).toEqual([alice, charlie, bob, david])
    })

    it('Descending', () => {
      expect(sortMemberships([david, alice, charlie, bob], 'inviteCount', true)).toEqual([david, charlie, bob, alice])
    })
  })
})
