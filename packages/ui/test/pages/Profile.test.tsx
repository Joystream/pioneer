import { Keyring } from '@polkadot/ui-keyring'
import { render } from '@testing-library/react'
import { expect } from 'chai'
import React from 'react'
import sinon from 'sinon'
import { Profile } from '../../src/pages/Profile/Profile'
import { KeyringContext } from '../../src/providers/keyring/context'
import { aliceSigner } from '../mocks/keyring'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { ApiContext } from '../../src/providers/api/context'
import { ApiPromise } from '@polkadot/api'
import { Address } from '@polkadot/types/interfaces'

describe('UI: Profile', () => {
  context('with empty keyring', () => {
    after(() => {
      sinon.restore()
    })

    it('Shows loading screen', async () => {
      sinon.stub(useAccountsModule, 'useAccounts').returns({
        hasAccounts: false,
        allAccounts: [],
      })

      const profile = render(<Profile />)
      expect(profile.getByText('Loading...')).to.exist
    })
  })

  context('with development accounts', () => {
    const mockApi = ({
      query: {
        system: {
          account: {
            multi: (addresses: Address[], cb: any) => {
              cb(addresses.map(() => ({ data: { free: { toHuman: () => '1000 JOY' } } })))

              return Promise.resolve()
            },
          },
        },
      },
    } as unknown) as ApiPromise

    it('Renders accounts list for known addresses', async () => {
      const { findAllByRole } = renderProfile()

      const [, accountsRowGroup] = [...(await findAllByRole('rowgroup'))]
      expect(accountsRowGroup.childNodes).to.have.length(8)
    })

    it("Displays account's data", async () => {
      const { findByText } = renderProfile()

      const alice = aliceSigner().address
      expect((await findByText(alice))?.previousSibling?.textContent).to.equal('alice')
      expect((await findByText(alice))?.parentNode?.nextSibling?.textContent).to.equal('1000 JOY')
    })

    function renderProfile() {
      return render(
        <KeyringContext.Provider value={new Keyring()}>
          <ApiContext.Provider value={{ isConnected: true, api: mockApi }}>
            <Profile />
          </ApiContext.Provider>
        </KeyringContext.Provider>
      )
    }
  })
})
