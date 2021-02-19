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
    {
      name: 'Alice4',
      handle: 'alice4',
      rootAccount: {
        name: 'Alice',
        address: 'address4',
      },
      controllerAccount: {
        name: 'alice4',
        address: 'address4',
      },
    },
    {
      name: 'Rob5',
      handle: 'rob5',
      rootAccount: {
        name: 'rob5',
        address: 'address5',
      },
      controllerAccount: {
        name: 'rob5',
        address: 'address5',
      },
    },
    {
      name: 'Alice6',
      handle: 'alice6',
      rootAccount: {
        name: 'Alice6',
        address: 'address6',
      },
      controllerAccount: {
        name: 'alice6',
        address: 'address6',
      },
    },
  ]
}
