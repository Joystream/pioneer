import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'

describe('memberRoleAbbreviation', () => {
  it('Member Role', () => {
    expect(memberRoleAbbreviation({ groupName: 'Member Role', isLead: false })).toEqual('M')
  })

  it('Lead', () => {
    expect(memberRoleAbbreviation({ groupName: 'Forum', isLead: true })).toEqual('FL')
  })

  it('Worker', () => {
    expect(memberRoleAbbreviation({ groupName: 'Forum', isLead: false })).toEqual('FW')
  })

  it('Lower case', () => {
    expect(memberRoleAbbreviation({ groupName: 'forum', isLead: true })).toEqual('FL')
  })
})

describe('memberRoleTitle', () => {
  it('Member Role', () => {
    expect(memberRoleTitle({ groupName: 'Member Role', isLead: false })).toEqual('Member Role')
  })

  it('Lead', () => {
    expect(memberRoleTitle({ groupName: 'Forum', isLead: true })).toEqual('Forum Lead')
  })

  it('Worker', () => {
    expect(memberRoleTitle({ groupName: 'Forum', isLead: false })).toEqual('Forum Worker')
  })

  it('Lower case', () => {
    expect(memberRoleTitle({ groupName: 'forum', isLead: true })).toEqual('Forum Lead')
  })
})
