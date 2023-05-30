import React, { ReactNode } from 'react'
import { HashRouter } from 'react-router-dom'

import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { ApiContextProvider } from '@/api/providers/provider'
import { QueryNodeProvider } from '@/app/providers/QueryNodeProvider'
import { Confirm2Provier } from '@/common/providers/confirm2/provider'
import { ImageReportProvider } from '@/common/providers/imageReports/provider'
import { KeyringContextProvider } from '@/common/providers/keyring/provider'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { NetworkEndpointsProvider } from '@/common/providers/network-endpoints/provider'
import { OnBoardingProvider } from '@/common/providers/onboarding/provider'
import { TransactionStatusProvider } from '@/common/providers/transactionStatus/provider'
import { MembershipContextProvider } from '@/memberships/providers/membership/provider'

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
                  <HashRouter>
                    <RouteActions>
                      <ModalContextProvider>
                        <BackendProvider>
                          <OnBoardingProvider>
                            <ImageReportProvider>
<<<<<<< HEAD
                              <GlobalStyle />
                              {children}
=======
                              <NotificationProvier>
                                <Confirm2Provier>
                                  <GlobalStyle />
                                  {children}
                                </Confirm2Provier>
                              </NotificationProvier>
>>>>>>> 2ba5d8f0 (5/30/2023)
                            </ImageReportProvider>
                          </OnBoardingProvider>
                        </BackendProvider>
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
)
