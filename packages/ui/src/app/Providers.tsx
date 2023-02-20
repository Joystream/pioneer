import React, { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HashRouter } from 'react-router-dom'

import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { ApiContextProvider } from '@/api/providers/provider'
import { QueryNodeProvider } from '@/app/providers/QueryNodeProvider'
import { ImageReportProvider } from '@/common/providers/imageReports/provider'
import { KeyringContextProvider } from '@/common/providers/keyring/provider'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { NetworkEndpointsProvider } from '@/common/providers/network-endpoints/provider'
import { OnBoardingProvider } from '@/common/providers/onboarding/provider'
import { TransactionStatusProvider } from '@/common/providers/transactionStatus/provider'
import { MembershipContextProvider } from '@/memberships/providers/membership/provider'

import ErrorFallback from './components/ErrorFallback'
import { GlobalStyle } from './providers/GlobalStyle'
import { RouteActions } from './RouteActions'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <KeyringContextProvider>
      <NetworkEndpointsProvider>
        <ApiContextProvider>
          <AccountsContextProvider>
            <QueryNodeProvider>
              <TransactionStatusProvider>
                <BalancesContextProvider>
                  <MembershipContextProvider>
                    <HashRouter>
                      <RouteActions>
                        <ModalContextProvider>
                          <OnBoardingProvider>
                            <ImageReportProvider>
                              <GlobalStyle />
                              {children}
                            </ImageReportProvider>
                          </OnBoardingProvider>
                        </ModalContextProvider>
                      </RouteActions>
                    </HashRouter>
                  </MembershipContextProvider>
                </BalancesContextProvider>
              </TransactionStatusProvider>
            </QueryNodeProvider>
          </AccountsContextProvider>
        </ApiContextProvider>
      </NetworkEndpointsProvider>
    </KeyringContextProvider>
  </ErrorBoundary>
)
