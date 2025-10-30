export const ALICE = 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'
export const ALICE_STASH = 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT'
export const BOB = 'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE'
export const BOB_STASH = 'j4X5AiyNC4497MpJLtyGdgEAS4JjDEjkRvtUPgZkiYudW5zox'
export const CHARLIE = 'j4UbMHiS79yvMLJctXggUugkkKmwxG5LW2YSy3ap8SmgF5qW9'
export const DAVE = 'j4SR5Mty5Mzy2dPTunA6TD4gBTwbSb8wRTabvu2gsLqC271d4'
export const EVE = 'j4WXe5CtD6NkEM1KUXP5BLB4sTN77PFL4edS3c7eXAAHP83aF'
export const FERDIE = 'j4RyHxutVFwhdbLwwr4oUaXWkP4dJrjLVWaYUDzpyBqawfcV3'

export const accountsMap = {
  alice: ALICE,
  alice_stash: ALICE_STASH,
  bob: BOB,
  bob_stash: BOB_STASH,
  charlie: CHARLIE,
  dave: DAVE,
  eve: EVE,
  ferdie: FERDIE,
} as const

export type KnownAccount = keyof typeof accountsMap

export const getAccount = (name: KnownAccount) => {
  return accountsMap[name]
}

export const getSudoAccount = () => getAccount('alice')
