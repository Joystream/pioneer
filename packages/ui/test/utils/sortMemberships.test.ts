import { BaseMember } from '../../src/common/types'
import { sortMemberships } from '../../src/membership/model/sortMemberships'

describe('sortMemberships', () => {
  const template = {
    id: '1',
    rootAccount: '',
    controllerAccount: '',
    name: '',
    about: '',
    isVerified: true,
    inviteCount: 0,
  }

  describe('By handle', () => {
    const alice: BaseMember = { ...template, handle: 'alice' }
    const bob: BaseMember = { ...template, handle: 'bob' }
    const bob2: BaseMember = { ...template, handle: 'bob', inviteCount: 10 }
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
  })

  describe('By invite number', () => {
    const alice: BaseMember = { ...template, inviteCount: 1, handle: 'alice' }
    const bob: BaseMember = { ...template, inviteCount: 2, handle: 'bob' }
    const charlie: BaseMember = { ...template, inviteCount: 2, handle: 'charlie' }
    const david: BaseMember = { ...template, inviteCount: 3, handle: 'david' }

    it('Ascending', () => {
      expect(sortMemberships([david, alice, charlie, bob], 'inviteCount', false)).toEqual([alice, charlie, bob, david])
    })

    it('Descending', () => {
      expect(sortMemberships([david, alice, charlie, bob], 'inviteCount', true)).toEqual([david, charlie, bob, alice])
    })
  })
})
