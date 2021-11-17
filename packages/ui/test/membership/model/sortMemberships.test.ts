import { sortMemberships } from '../../../src/memberships/model/sortMemberships'
import { Member } from '../../../src/memberships/types'

describe('sortMemberships', () => {
  const template: Member = {
    handle: '',
    id: '1',
    name: '',
    rootAccount: '',
    controllerAccount: '',
    isFoundingMember: false,
    isCouncilMember: false,
    roles: [],
    boundAccounts: [],
    isVerified: true,
    inviteCount: 0,
    createdAt: '',
  }

  describe('By handle', () => {
    const alice: Member = { ...template, handle: 'alice' }
    const bob: Member = { ...template, handle: 'bob' }
    const bob2: Member = { ...template, handle: 'bob', inviteCount: 10 }
    const charlie: Member = { ...template, handle: 'charlie' }
    const david: Member = { ...template, handle: 'david' }

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
    const alice: Member = { ...template, inviteCount: 1, handle: 'alice' }
    const bob: Member = { ...template, inviteCount: 2, handle: 'bob' }
    const charlie: Member = { ...template, inviteCount: 2, handle: 'charlie' }
    const david: Member = { ...template, inviteCount: 3, handle: 'david' }

    it('Ascending', () => {
      expect(sortMemberships([david, alice, charlie, bob], 'inviteCount', false)).toEqual([alice, charlie, bob, david])
    })

    it('Descending', () => {
      expect(sortMemberships([david, alice, charlie, bob], 'inviteCount', true)).toEqual([david, charlie, bob, alice])
    })
  })
})
