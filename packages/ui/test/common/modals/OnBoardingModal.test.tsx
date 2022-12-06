import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { Colors } from '@/common/constants'
import { OnBoardingModal } from '@/common/modals/OnBoardingModal'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { UseOnBoarding } from '@/common/providers/onboarding/types'

import { MockApolloProvider } from '../../_mocks/providers'
import { stubAccounts, stubApi } from '../../_mocks/transactions'
import { mockedMyBalances, zeroBalance } from '../../setup'

const mockOnBoarding: UseOnBoarding = {
  status: 'installPlugin',
  isLoading: false,
  setMembershipAccount: jest.fn(),
}

jest.mock('@/common/hooks/useOnBoarding', () => ({
  useOnBoarding: () => mockOnBoarding,
}))
const mockWallets = [
  {
    installUrl: 'extrawallet.com',
    title: 'ExtraWallet',
    logo: { alt: 'alt', src: '' },
    installed: false,
    extensionName: 'name',
  },
]
jest.mock('injectweb3-connect', () => ({
  getAllWallets: () => mockWallets,
  getWalletBySource: () => undefined,
}))

describe('UI: OnBoardingModal', () => {
  const api = stubApi()

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: undefined,
  }

  afterEach(cleanup)

  it('Do not render', () => {
    mockOnBoarding.isLoading = true

    const { queryByText } = renderModal()

    expect(queryByText('Add Polkadot plugin')).toBeNull()
  })

  describe('Status: Install plugin', () => {
    beforeAll(() => {
      mockOnBoarding.isLoading = false
      mockOnBoarding.status = 'installPlugin'
    })

    it('Stepper matches', () => {
      const { getByText } = renderModal()

      const pluginStepCircle = getStepperStepCircle('Connect wallet', getByText)
      expect(pluginStepCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Opens website', () => {
      const windowSpy = jest.spyOn(window, 'open').mockImplementation(jest.fn())
      const { getByText } = renderModal()
      const extension = screen.getByText(mockWallets[0].title)
      fireEvent.click(extension)

      const pluginButton = getByText('Install extension')
      expect(pluginButton).toBeDefined()
      expect(pluginButton).toBeEnabled()

      act(() => pluginButton.click())

      expect(windowSpy).toBeCalledWith(mockWallets[0].installUrl, '_blank')
    })
  })

  describe('Status: addAccount', () => {
    beforeAll(() => {
      mockOnBoarding.status = 'addAccount'
    })

    it('Stepper matches', () => {
      const { getByText } = renderModal()

      const accountCircle = getStepperStepCircle('Connect account', getByText)

      expect(accountCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    describe('Add account step', () => {
      it('Create account instructions', () => {
        const { queryByText } = renderModal()

        expect(queryByText('Create an account')).toBeDefined()
      })
    })

    describe('Pick account step', () => {
      beforeAll(() => {
        stubAccounts([
          {
            address: '123',
            name: 'Alice',
          },
          {
            address: '321',
            name: 'Bob',
          },
        ])
        mockedMyBalances.mockReturnValue({
          '123': {
            ...zeroBalance,
            total: new BN(10),
          },
          '321': {
            ...zeroBalance,
          },
        })
      })

      it('Shows correct screen', () => {
        const { queryByText } = renderModal()

        expect(queryByText('Connect accounts')).toBeDefined()
      })

      it('Shows accounts with balance', () => {
        const { getByText } = renderModal()

        const alice = getByText('Alice')
        const bob = getByText('Bob')

        expect(alice).toBeDefined()
        expect(bob).toBeDefined()

        const aliceBalance = alice?.parentElement?.parentElement?.children?.item(1)?.textContent
        const bobBalance = bob?.parentElement?.parentElement?.children?.item(1)?.textContent

        expect(aliceBalance).toBe('10')
        expect(bobBalance).toBe('0')
      })

      it('Proceed to next step', () => {
        const { getByText } = renderModal()

        act(() => getByText('Alice').click())
        act(() => getByText('Connect Account').click())

        expect(mockOnBoarding.setMembershipAccount).toBeCalledWith('123')
      })
    })
  })

  describe('Status: createMembership', () => {
    beforeAll(() => {
      mockOnBoarding.status = 'createMembership'
    })

    it('Step matches', () => {
      const { getByText } = renderModal()

      const membershipCircle = getStepperStepCircle('Create free membership', getByText)

      expect(membershipCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Shows correct screen', () => {
      const { queryByText } = renderModal()

      expect(queryByText(/Root account/i)).toBeDefined()
      expect(queryByText(/Create A Membership/)).toBeDefined()
    })
  })

  const getStepperStepCircle = (text: string, getByText: any) => getByText(text)?.parentElement?.previousElementSibling

  const renderModal = () =>
    render(
      <MemoryRouter>
        <MockApolloProvider>
          <ApiContext.Provider value={api}>
            <ModalContext.Provider value={useModal}>
              <OnBoardingModal />
            </ModalContext.Provider>
          </ApiContext.Provider>
        </MockApolloProvider>
      </MemoryRouter>
    )
})
