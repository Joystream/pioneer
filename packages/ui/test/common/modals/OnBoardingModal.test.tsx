import { cleanup, render } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { AddressToBalanceMap } from '@/accounts/types'
import { Colors } from '@/common/constants'
import { OnBoardingModal } from '@/common/modals/OnBoardingModal'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { UseOnBoarding } from '@/common/providers/onboarding/types'

import { stubApi } from '../../_mocks/transactions'

const mockUseMyAccounts: UseAccounts = {
  isLoading: false,
  hasAccounts: false,
  allAccounts: [],
  error: undefined,
}

const mockOnBoarding: UseOnBoarding = {
  status: 'installPlugin',
  isLoading: false,
  setMembershipAccount: jest.fn(),
}

let mockMyBalances: AddressToBalanceMap = {}

jest.mock('@/accounts/hooks/useMyAccounts', () => ({
  useMyAccounts: () => mockUseMyAccounts,
}))

jest.mock('@/accounts/hooks/useMyBalances', () => ({
  useMyBalances: () => mockMyBalances,
}))

jest.mock('@/common/hooks/useOnBoarding', () => ({
  useOnBoarding: () => mockOnBoarding,
}))

describe('UI: OnBoardingModal', () => {
  stubApi()

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
    })

    it('Stepper matches', () => {
      const { getByText } = renderModal()

      const pluginStepCircle = getStepperStepCircle('Add Polkadot plugin', getByText)

      expect(pluginStepCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Opens website', () => {
      const windowSpy = jest.spyOn(window, 'open').mockImplementation(jest.fn())
      const { getByText } = renderModal()

      const pluginButton = getByText('Install extension')
      expect(pluginButton).toBeDefined()

      pluginButton.click()

      expect(windowSpy).toBeCalledWith('https://polkadot.js.org/extension/', '_blank')
    })
  })

  describe('Status: addAccount', () => {
    beforeAll(() => {
      mockOnBoarding.status = 'addAccount'
    })

    it('Stepper matches', () => {
      const { getByText } = renderModal()

      const accountCircle = getStepperStepCircle('Connect a Polkadot account', getByText)

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
        mockUseMyAccounts.hasAccounts = true
        mockUseMyAccounts.allAccounts = [
          {
            address: '123',
            name: 'Alice',
          },
          {
            address: '321',
            name: 'Bob',
          },
        ]
        mockMyBalances = {
          '123': {
            total: new BN(10),
            locked: new BN(0),
            recoverable: new BN(0),
            transferable: new BN(0),
            locks: [],
          },
          '321': {
            total: new BN(0),
            locked: new BN(0),
            recoverable: new BN(0),
            transferable: new BN(0),
            locks: [],
          },
        }
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

        getByText('Alice').click()
        getByText('Connect Account').click()

        expect(mockOnBoarding.setMembershipAccount).toBeCalledWith('123')
      })
    })
  })

  describe('Status: getFreeTokens', () => {
    beforeAll(() => {
      mockOnBoarding.status = 'getFreeTokens'
    })

    it('Step matches', () => {
      const { getByText } = renderModal()

      const tokenCircle = getStepperStepCircle('Get FREE tokens', getByText)

      expect(tokenCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Shows correct screen', () => {
      const { queryByText } = renderModal()

      expect(queryByText('One Last Thing')).toBeDefined()
      expect(queryByText('Continue And Get Free Tokens')).toBeDefined()
    })

    it('Proceed to next step', () => {
      const { getByText } = renderModal()

      getByText(/Continue And Get Tokens/i)?.click()

      expect(mockOnBoarding.setMembershipAccount).toBeCalledWith('redeemed')
    })
  })

  describe('Status: createMembership', () => {
    beforeAll(() => {
      mockOnBoarding.status = 'createMembership'
    })

    it('Step matches', () => {
      const { getByText } = renderModal()

      const membershipCircle = getStepperStepCircle('Create membership', getByText)

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
      <ModalContext.Provider value={useModal}>
        <OnBoardingModal />
      </ModalContext.Provider>
    )
})
