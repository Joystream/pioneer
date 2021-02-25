import { IKeyringPair } from '@polkadot/types/types'
import {
  aliceSigner,
  aliceStashSigner,
  bobSigner,
  bobStashSigner,
  charlieSigner,
  daveSigner,
  eveSigner,
  ferdieSigner,
} from './signers'

const mockAccount = async (name: string, signer: Promise<IKeyringPair>) => {
  return {
    name,
    address: (await signer).address,
  }
}

export const knownAccounts = async () => ({
  alice: await mockAccount('alice', aliceSigner()),
  aliceStash: await mockAccount('alice_stash', aliceStashSigner()),
  bob: await mockAccount('bob', bobSigner()),
  bobStash: await mockAccount('bob_stash', bobStashSigner()),
  charlie: await mockAccount('charlie', charlieSigner()),
  dave: await mockAccount('dave', daveSigner()),
  eve: await mockAccount('eve', eveSigner()),
  ferdie: await mockAccount('ferdie', ferdieSigner()),
})

type Unpack<T> = T extends Promise<infer U> ? U : never

export type KnownAccounts = Unpack<ReturnType<typeof knownAccounts>>
