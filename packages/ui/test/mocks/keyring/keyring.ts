import { aliceSigner } from './signers'
import { Keyring } from '@polkadot/ui-keyring'

export function createMockKeyring(options = { useMockAddresses: false }) {
  const alice = aliceSigner()

  return ({
    accounts: {
      subject: {
        subscribe: (next: any) => {
          if (options.useMockAddresses) {
            next({
              [alice.address]: {
                json: {
                  address: alice.address,
                  meta: {
                    name: 'alice',
                  },
                },
              },
            })
          }
          return {
            unsubscribe() {
              /**/
            },
          }
        },
      },
    },
  } as unknown) as Keyring
}
