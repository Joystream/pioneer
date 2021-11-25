import React, { ReactNode } from 'react'
import { HashRouter } from 'react-router-dom'

import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { QueryNodeProvider } from '@/app/providers/QueryNodeProvider'
import { ApiContextProvider } from '@/common/providers/api/provider'
import { KeyringContextProvider } from '@/common/providers/keyring/provider'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { OnBoardingProvider } from '@/common/providers/onboarding/provider'
import { TransactionContextProvider } from '@/common/providers/transaction/provider'
import { MembershipContextProvider } from '@/memberships/providers/membership/provider'

import { GlobalStyle } from './providers/GlobalStyle'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => (
  <KeyringContextProvider>
    <ApiContextProvider>
      <AccountsContextProvider>
        <TransactionContextProvider>
          <BalancesContextProvider>
            <QueryNodeProvider>
              <MembershipContextProvider>
                <HashRouter>
                  <ModalContextProvider>
                    <OnBoardingProvider>
                      <GlobalStyle />
                      {children}
                    </OnBoardingProvider>
                  </ModalContextProvider>
                </HashRouter>
              </MembershipContextProvider>
            </QueryNodeProvider>
          </BalancesContextProvider>
        </TransactionContextProvider>
      </AccountsContextProvider>
    </ApiContextProvider>
  </KeyringContextProvider>
)
