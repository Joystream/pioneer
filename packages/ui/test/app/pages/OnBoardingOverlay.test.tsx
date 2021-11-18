import { cleanup, render } from '@testing-library/react'
import React from 'react'

import { OnBoardingOverlay } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { Colors } from '@/common/constants'
import { UseOnBoarding } from '@/common/providers/onboarding/types'

const mockOnBoarding: UseOnBoarding = {
  status: 'installPlugin',
  isLoading: false,
  setFreeTokens: jest.fn()
}

jest.mock('@/common/hooks/useOnBoarding', () => ({
  useOnBoarding: () => mockOnBoarding
}))

describe('OnBoardingOverlay', () => {
  afterEach(cleanup)

  it('Loading', () => {
    mockOnBoarding.isLoading = true

    const { queryByText } = renderComponent()

    expect(queryByText('Join now')).toBeNull()
  })

  describe('Loaded', () => {
    beforeAll(() => {
      mockOnBoarding.isLoading = false
    })

    it('Expands', () => {
      const { getByText } = renderComponent()

      getByText(/^Show how$/i).click()

      expect(getByText('What are the benefits?')).toBeDefined()
      expect(getByText('How to become a member?')).toBeDefined()
    })

    it('Install plugin', () => {
      const { getByText } = renderComponent()
      const pluginCircle = getStepCircle('Add Polkadot plugin', getByText)

      expect(pluginCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Add account', () => {
      mockOnBoarding.status = 'addAccount'
      const { getByText } = renderComponent()

      const accountCircle = getStepCircle('Connect a Polkadot account', getByText)
      const pluginCircle = getStepCircle('Add Polkadot plugin', getByText)

      expect(pluginCircle).toHaveStyle(`background-color: ${Colors.Black[500]}`)
      expect(accountCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Get FREE Tokens', () => {
      mockOnBoarding.status = 'getFreeTokens'
      const { getByText } = renderComponent()

      const accountCircle = getStepCircle('Connect a Polkadot account', getByText)
      const tokensCircle = getStepCircle('Get FREE tokens', getByText)

      expect(accountCircle).toHaveStyle(`background-color: ${Colors.Black[500]}`)
      expect(tokensCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Create membership', () => {
      mockOnBoarding.status = 'createMembership'
      const { getByText } = renderComponent()

      const tokensCircle = getStepCircle('Get FREE tokens', getByText)
      const membershipCircle = getStepCircle('Create membership', getByText)

      expect(tokensCircle).toHaveStyle(`background-color: ${Colors.Black[500]}`)
      expect(membershipCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Finished', () => {
      mockOnBoarding.status = 'finished'
      const { queryByText } = renderComponent()

      expect(queryByText('Join now')).toBeNull()
    })
  })

  const getStepCircle = (text: string, getByText: any) => getByText(text)?.parentElement?.previousElementSibling

  const renderComponent = () => render(<OnBoardingOverlay />)
})
