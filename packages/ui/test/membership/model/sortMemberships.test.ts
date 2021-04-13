import { sortMemberships } from '../../../src/memberships/model/sortMemberships'
import { MemberInternal } from '../../../src/memberships/types'

describe('sortMemberships', () => {
  const template: MemberInternal = {
    handle: '',
    id: '1',
    name: '',
    rootAccount: '',
    controllerAccount: '',
    isFoundingMember: false,
    roles: [],
    isVerified: true,
    inviteCount: 0,
  }

  describe('By handle', () => {
    const alice: MemberInternal = { ...template, handle: 'alice' }
    const bob: MemberInternal = { ...template, handle: 'bob' }
    const bob2: MemberInternal = { ...template, handle: 'bob', inviteCount: 10 }
    const charlie: MemberInternal = { ...template, handle: 'charlie' }
    const david: MemberInternal = { ...template, handle: 'david' }

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
    const alice: MemberInternal = { ...template, inviteCount: 1, handle: 'alice' }
    const bob: MemberInternal = { ...template, inviteCount: 2, handle: 'bob' }
    const charlie: MemberInternal = { ...template, inviteCount: 2, handle: 'charlie' }
    const david: MemberInternal = { ...template, inviteCount: 3, handle: 'david' }

    it('Ascending', () => {
      expect(sortMemberships([david, alice, charlie, bob], 'inviteCount', false)).toEqual([alice, charlie, bob, david])
    })

    it('Descending', () => {
      expect(sortMemberships([david, alice, charlie, bob], 'inviteCount', true)).toEqual([david, charlie, bob, alice])
    })
  })
})
