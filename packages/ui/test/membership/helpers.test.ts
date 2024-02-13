import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'

describe('memberRoleAbbreviation', () => {
  it('Member Role', () => {
    expect(memberRoleAbbreviation({ id: '0', groupName: 'Member Role', isLead: false, isActive: true })).toEqual('M')
  })

  it('Lead', () => {
    expect(memberRoleAbbreviation({ id: '0', groupName: 'Forum', isLead: true, isActive: true })).toEqual('FL')
  })

  it('Worker', () => {
    expect(memberRoleAbbreviation({ id: '0', groupName: 'Forum', isLead: false, isActive: true })).toEqual('FW')
  })

  it('Lower case', () => {
    expect(memberRoleAbbreviation({ id: '0', groupName: 'forum', isLead: true, isActive: true })).toEqual('FL')
  })
})

describe('memberRoleTitle', () => {
  it('Member Role', () => {
    expect(memberRoleTitle({ id: '0', groupName: 'Member Role', isLead: false, isActive: true })).toEqual('Member Role')
  })

  it('Lead', () => {
    expect(memberRoleTitle({ id: '0', groupName: 'Forum', isLead: true, isActive: true })).toEqual('Forum Lead')
  })

  it('Worker', () => {
    expect(memberRoleTitle({ id: '0', groupName: 'Forum', isLead: false, isActive: true })).toEqual('Forum Worker')
  })

  it('Lower case', () => {
    expect(memberRoleTitle({ id: '0', groupName: 'forum', isLead: true, isActive: true })).toEqual('Forum Lead')
  })
})
