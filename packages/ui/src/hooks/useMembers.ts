import { Member } from '../common/types'

export function useMembers(): Member[] {
  return [
    {
      name: 'Bob',
      handle: 'bob',
      rootAccount: {
        name: 'bob',
        address: 'address',
      },
      controllerAccount: {
        name: 'bob',
        address: 'address',
      },
    },
    {
      name: 'Alice',
      handle: 'alice',
      rootAccount: {
        name: 'Alice',
        address: 'address2',
      },
      controllerAccount: {
        name: 'alice',
        address: 'address2',
      },
    },
    {
      name: 'Rob',
      handle: 'rob',
      rootAccount: {
        name: 'rob',
        address: 'address3',
      },
      controllerAccount: {
        name: 'rob',
        address: 'address3',
      },
    },
  ]
}
