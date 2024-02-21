import React, { ReactNode } from 'react'
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
import { ResponsiveProvider } from '@/common/providers/responsive/provider'
import { TransactionStatusProvider } from '@/common/providers/transactionStatus/provider'
import { MembershipContextProvider } from '@/memberships/providers/membership/provider'
import { ValidatorContextProvider } from '@/validators/providers/provider'

import { BackendProvider } from './providers/backend/provider'
import { GlobalStyle } from './providers/GlobalStyle'
import { RouteActions } from './RouteActions'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => (
  <KeyringContextProvider>
    <NetworkEndpointsProvider>
      <ApiContextProvider>
        <AccountsContextProvider>
          <QueryNodeProvider>
            <TransactionStatusProvider>
              <BalancesContextProvider>
                <MembershipContextProvider>
                  <ValidatorContextProvider>
                    <HashRouter>
                      <RouteActions>
                        <ModalContextProvider>
                          <BackendProvider>
                            <OnBoardingProvider>
                              <ImageReportProvider>
                                <ResponsiveProvider>
                                  <GlobalStyle />
                                  {children}
                                </ResponsiveProvider>
                              </ImageReportProvider>
                            </OnBoardingProvider>
                          </BackendProvider>
                        </ModalContextProvider>
                      </RouteActions>
                    </HashRouter>
                  </ValidatorContextProvider>
                </MembershipContextProvider>
              </BalancesContextProvider>
            </TransactionStatusProvider>
          </QueryNodeProvider>
        </AccountsContextProvider>
      </ApiContextProvider>
    </NetworkEndpointsProvider>
  </KeyringContextProvider>
)
