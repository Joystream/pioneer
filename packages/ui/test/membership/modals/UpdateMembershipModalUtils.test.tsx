import {
  changedOrNull,
  getChangedFields,
  hasAnyEdits,
} from '../../../src/memberships/modals/UpdateMembershipModal/utils'

describe('UI: UpdatedMembershipModal - helpers', () => {
  const member = {
    id: '0',
    name: 'Alice Member',
    handle: 'alice_handle',
    about: '',
    avatarUri: '',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    isFoundingMember: true,
    isVerified: true,
    inviteCount: 5,
  }
  const form = {
    id: '0',
    name: 'Alice Member',
    handle: 'alice_handle',
    about: '',
    avatarUri: '',
    rootAccount: {
      address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      name: '',
    },
    controllerAccount: {
      address: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      name: '',
    },
  }
  const changedAccount = {
    ...form,
    ...{
      rootAccount: { name: '', address: 'foo-bar' },
    },
  }
  const changedName = {
    ...form,
    ...{
      name: 'Foo Bar',
    },
  }
  const changedMultiple = {
    ...form,
    ...{
      controllerAccount: { name: '', account: 'foo-bar' },
      handle: 'bax',
      name: 'Foo Bar',
    },
  }

  describe('getChangedFields', () => {
    it('nothing changed', () => {
      expect(getChangedFields(form, member)).toEqual([])
    })

    it('account changed', () => {
      expect(getChangedFields(changedAccount, member)).toEqual(['rootAccount'])
    })

    it('name changed', () => {
      expect(getChangedFields(changedName, member)).toEqual(['name'])
    })

    it('multiple fields changed', () => {
      expect(getChangedFields(changedMultiple, member)).toEqual(['name', 'handle', 'controllerAccount'])
    })
  })

  describe('hasAnyEdits', () => {
    it('nothing changed', () => {
      expect(hasAnyEdits(form, member)).toBeFalsy()
    })

    it('account changed', () => {
      expect(hasAnyEdits(changedAccount, member)).toBeTruthy()
    })

    it('name changed', () => {
      expect(hasAnyEdits(changedName, member)).toBeTruthy()
    })

    it('multiple fields changed', () => {
      expect(hasAnyEdits(changedMultiple, member)).toBeTruthy()
    })
  })

  describe('changedOrNull', () => {
    it('name changed', () => {
      expect(changedOrNull(changedName, member)).toEqual({
        name: 'Foo Bar',
        id: null,
        handle: null,
        about: null,
        avatarUri: null,
        rootAccount: null,
        controllerAccount: null,
      })
    })

    it('account changed', () => {
      expect(changedOrNull(changedAccount, member)).toEqual({
        id: null,
        handle: null,
        name: null,
        about: null,
        avatarUri: null,
        rootAccount: { name: '', address: 'foo-bar' },
        controllerAccount: null,
      })
    })

    it('multiple changed', () => {
      expect(changedOrNull(changedMultiple, member)).toEqual({
        id: null,
        handle: 'bax',
        name: 'Foo Bar',
        about: null,
        avatarUri: null,
        rootAccount: null,
        controllerAccount: { name: '', account: 'foo-bar' },
      })
    })
  })
})
