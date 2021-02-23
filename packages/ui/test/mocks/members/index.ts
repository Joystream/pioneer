import { Server } from 'miragejs/server'

export const createMember = (
  server: Server,
  member: { name: string; handle: string; rootAccount: string; controllerAccount: string }
) => {
  server.create('Member', (member as unknown) as any)
}

export const aliceMember = {
  name: 'Alice Member',
  handle: 'alice_handle',
  rootAccount: 'aa',
  controllerAccount: 'bb',
  isVerified: true,
  isFoundingMember: true,
  inviteCount: 4,
}

export const bobMember = {
  name: 'Bob Member',
  handle: 'bob_handle',
  rootAccount: 'aa',
  controllerAccount: 'bb',
  inviteCount: 4,
  isVerified: true,
  isFoundingMember: true,
}
