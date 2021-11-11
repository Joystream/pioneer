import { render } from '@testing-library/react'
import React from 'react'

import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { AddressToBalanceMap } from '@/accounts/types'
import { Colors } from '@/common/constants'
import { UseOnBoardingStatus } from '@/common/hooks/useOnBoardingStatus'
import { OnBoardingModal } from '@/common/modals/OnBoardingModal'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'

import { stubApi } from '../../_mocks/transactions'

const mockUseMyAccounts: UseAccounts = {
  isLoading: false,
  hasAccounts: false,
  allAccounts: [],
  error: undefined,
}

const mockOnBoardingStatus: UseOnBoardingStatus = {
  status: 'installPlugin',
  isLoading: false,
  setFreeTokens: undefined,
}

const mockMyBalances: AddressToBalanceMap = {}

jest.mock('@/accounts/hooks/useMyAccounts', () => ({
  useMyAccounts: () => mockUseMyAccounts,
}))

jest.mock('@/accounts/hooks/useMyBalances', () => ({
  useMyBalances: () => mockMyBalances,
}))

jest.mock('@/common/hooks/useOnBoardingStatus', () => ({
  useOnBoardingStatus: () => mockOnBoardingStatus,
}))

describe('UI: OnBoardingModal', () => {
  stubApi()

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: undefined,
  }

  it('Do not render', () => {
    mockOnBoardingStatus.isLoading = true

    const { queryByText } = renderModal()

    expect(queryByText('Add Polkadot plugin')).toBeNull()
  })

  describe('Status: Install plugin', () => {
    beforeAll(() => {
      mockOnBoardingStatus.isLoading = false
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

  const getStepperStepCircle = (text: string, getByText: any) => getByText(text)?.parentElement?.previousElementSibling

  const renderModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <OnBoardingModal />
      </ModalContext.Provider>
    )
})
