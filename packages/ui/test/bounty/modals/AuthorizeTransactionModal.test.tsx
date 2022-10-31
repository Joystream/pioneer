import { render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { ActorRef } from 'xstate'

import { ApiContext } from '@/api/providers/context'
import {
  AuthorizeTransactionModal,
  Props as AuthorizeTransactionModalProps,
} from '@/bounty/modals/AuthorizeTransactionModal'
import { formatTokenValue } from '@/common/model/formatters'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import bounties from '@/mocks/data/raw/bounties.json'

import { alice } from '../../_mocks/keyring'
import { MockKeyringProvider, MockApolloProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction, stubDefaultBalances } from '../../_mocks/transactions'

jest.mock('@xstate/react', () => ({
  ...jest.requireActual('@xstate/react'),
  useActor: () => [
    {
      value: 1,
      matches: (state: string) => state === 'prepare',
    },
    jest.fn(),
  ],
}))

const bounty = bounties[0]

describe('UI: AuthorizeTransactionModal', () => {
  const api = stubApi()
  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: {
      bounty: { ...bounty },
    },
  }

  const fee = 888
  const transaction = stubTransaction(api, '', fee) as any
  const service = {} as ActorRef<any>
  const controllerAccount = alice
  const onClose = jest.fn()
  const description = 'description'
  const buttonLabel = 'button-label'
  const contributeAmount = new BN(222)
  const props: AuthorizeTransactionModalProps = {
    onClose,
    transaction,
    service,
    controllerAccount,
    description,
    buttonLabel,
    contributeAmount,
  }

  beforeEach(() => {
    stubDefaultBalances()
    renderModal()
  })

  it('Renders', async () => {
    expect(screen.getByText('modals.authorizeTransaction.title')).toBeInTheDocument()
  })

  it('Displays correct description', () => {
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('Displays proper button label', () => {
    expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  })

  it('Displays correct fee', () => {
    const expected = String(fee)
    const valueContainer = screen.getByText('modals.transactionFee.label')?.nextSibling

    expect(valueContainer?.textContent).toBe(expected)
  })

  it('Displays correct contribute amount', () => {
    const expected = contributeAmount.toString()
    const valueContainer = screen.getByText(
      `modals.common.contributeAmount ${formatTokenValue(contributeAmount)}`
    )?.nextSibling

    expect(valueContainer?.textContent).toBe(expected)
  })

  const renderModal = () =>
    render(
      <MockApolloProvider>
        <ModalContext.Provider value={useModal}>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <AuthorizeTransactionModal {...props} />
            </ApiContext.Provider>
          </MockKeyringProvider>
        </ModalContext.Provider>
      </MockApolloProvider>
    )
})
