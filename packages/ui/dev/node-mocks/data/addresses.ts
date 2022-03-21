export const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
export const ALICE_STASH = '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY'
export const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'
export const BOB_STASH = '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc'
export const CHARLIE = '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
export const DAVE = '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy'
export const EVE = '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw'
export const FERDIE = '5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL'

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
