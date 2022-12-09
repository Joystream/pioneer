import { cleanup, render, screen } from '@testing-library/react'
import { Wallet } from 'injectweb3-connect'
import React from 'react'

import { OnBoardingOverlay, onBoardingSteps } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { UseOnBoarding } from '@/common/providers/onboarding/types'

import { mockedUseMyAccounts } from '../setup'

const mockOnBoarding: UseOnBoarding = {
  status: 'installPlugin',
  isLoading: false,
  setMembershipAccount: jest.fn(),
}

jest.mock('@/common/hooks/useOnBoarding', () => ({
  useOnBoarding: () => mockOnBoarding,
}))

jest.mock('@/api/hooks/useApi', () => ({
  useApi: () => ({
    api: {
      isConnected: true,
    },
  }),
}))

describe('OnBoardingOverlay', () => {
  afterEach(cleanup)

  it('Loading', () => {
    mockOnBoarding.isLoading = true

    const { queryByText } = renderComponent()

    expect(queryByText('Join Now')).toBeNull()
  })

  describe('Loaded', () => {
    beforeAll(() => {
      mockOnBoarding.isLoading = false
    })

    it('No wallet', () => {
      renderComponent()

      expect(screen.queryByText('Connect Wallet')).toBeInTheDocument()
    })

    it('After wallet is selected', () => {
      mockedUseMyAccounts.mockReturnValue({
        allAccounts: [],
        hasAccounts: false,
        isLoading: true,
        wallet: {} as Wallet,
      })
      renderComponent()

      expect(screen.queryByText('Connect Wallet')).not.toBeInTheDocument()
      expect(screen.queryByText('Join Now')).toBeInTheDocument()
    })

    it('Expands', () => {
      const { getByText } = renderComponent()

      getByText(/^Show how$/i).click()

      expect(getByText('What are the benefits?')).toBeDefined()
      expect(getByText('How to become a member?')).toBeDefined()
    })

    it('Renders all steps', () => {
      renderComponent()

      onBoardingSteps.map(({ title }) => {
        expect(screen.queryByText(title)).toBeInTheDocument()
      })
    })

    it('Finished', () => {
      mockOnBoarding.status = 'finished'
      const { queryByText } = renderComponent()

      expect(queryByText('Join Now')).toBeNull()
    })
  })

  const renderComponent = () => render(<OnBoardingOverlay />)
})
