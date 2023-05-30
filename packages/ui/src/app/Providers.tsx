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
import { NotificationProvier } from '@/common/providers/Notification/provider'
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
                              <NotificationProvier>
                                <Confirm2Provier>
                                  <GlobalStyle />
                                  {children}
                                </Confirm2Provier>
                              </NotificationProvier>
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
