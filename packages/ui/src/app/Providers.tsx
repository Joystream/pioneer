import React, { ReactNode } from 'react'
import { HashRouter } from 'react-router-dom'

import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { QueryNodeProvider } from '@/app/providers/QueryNodeProvider'
import { ApiContextProvider } from '@/common/providers/api/provider'
import { KeyringContextProvider } from '@/common/providers/keyring/provider'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { MembershipContextProvider } from '@/memberships/providers/membership/provider'
import { Mocks } from '@/mocks/Mocks'

import { GlobalStyle } from './providers/GlobalStyle'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => (
  <KeyringContextProvider>
    <ApiContextProvider>
      <AccountsContextProvider>
        <QueryNodeProvider>
          <MembershipContextProvider>
            <HashRouter>
              <ModalContextProvider>
                <Mocks />
                <GlobalStyle />
                {children}
              </ModalContextProvider>
            </HashRouter>
          </MembershipContextProvider>
        </QueryNodeProvider>
      </AccountsContextProvider>
    </ApiContextProvider>
  </KeyringContextProvider>
)
