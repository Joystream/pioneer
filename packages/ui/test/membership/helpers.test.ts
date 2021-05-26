import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'

describe('memberRoleAbbreviation', () => {
  it('Member Role', () => {
    expect(memberRoleAbbreviation({ groupName: 'Member Role', isLeader: false })).toEqual('M')
  })

  it('Leader', () => {
    expect(memberRoleAbbreviation({ groupName: 'Forum', isLeader: true })).toEqual('FL')
  })

  it('Worker', () => {
    expect(memberRoleAbbreviation({ groupName: 'Forum', isLeader: false })).toEqual('FW')
  })

  it('Lower case', () => {
    expect(memberRoleAbbreviation({ groupName: 'forum', isLeader: true })).toEqual('FL')
  })
})

describe('memberRoleTitle', () => {
  it('Member Role', () => {
    expect(memberRoleTitle({ groupName: 'Member Role', isLeader: false })).toEqual('Member Role')
  })

  it('Leader', () => {
    expect(memberRoleTitle({ groupName: 'Forum', isLeader: true })).toEqual('Forum Leader')
  })

  it('Worker', () => {
    expect(memberRoleTitle({ groupName: 'Forum', isLeader: false })).toEqual('Forum Worker')
  })

  it('Lower case', () => {
    expect(memberRoleTitle({ groupName: 'forum', isLeader: true })).toEqual('Forum Leader')
  })
})
