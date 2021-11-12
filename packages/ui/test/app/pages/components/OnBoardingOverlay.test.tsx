import { cleanup, render } from '@testing-library/react'
import React from 'react'

import { OnBoardingOverlay } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { Colors } from '@/common/constants'
import { UseOnBoardingStatus } from '@/common/hooks/useOnBoardingStatus'

const mockOnBoardingStatus: UseOnBoardingStatus = {
  status: 'installPlugin',
  isLoading: false,
  setFreeTokens: jest.fn(),
}

jest.mock('@/common/hooks/useOnBoardingStatus', () => ({
  useOnBoardingStatus: () => mockOnBoardingStatus,
}))

describe('OnBoardingOverlay', () => {
  afterEach(cleanup)

  it('Loading', () => {
    mockOnBoardingStatus.isLoading = true

    const { queryByText } = renderComponent()

    expect(queryByText('Join now')).toBeNull()
  })

  describe('Loaded', () => {
    beforeAll(() => {
      mockOnBoardingStatus.isLoading = false
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
      mockOnBoardingStatus.status = 'addAccount'
      const { getByText } = renderComponent()

      const accountCircle = getStepCircle('Connect a Polkadot account', getByText)
      const pluginCircle = getStepCircle('Add Polkadot plugin', getByText)

      expect(pluginCircle).toHaveStyle(`background-color: ${Colors.Black[500]}`)
      expect(accountCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Get FREE Tokens', () => {
      mockOnBoardingStatus.status = 'getFreeTokens'
      const { getByText } = renderComponent()

      const accountCircle = getStepCircle('Connect a Polkadot account', getByText)
      const tokensCircle = getStepCircle('Get FREE tokens', getByText)

      expect(accountCircle).toHaveStyle(`background-color: ${Colors.Black[500]}`)
      expect(tokensCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Create membership', () => {
      mockOnBoardingStatus.status = 'createMembership'
      const { getByText } = renderComponent()

      const tokensCircle = getStepCircle('Get FREE tokens', getByText)
      const membershipCircle = getStepCircle('Create membership', getByText)

      expect(tokensCircle).toHaveStyle(`background-color: ${Colors.Black[500]}`)
      expect(membershipCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Finished', () => {
      mockOnBoardingStatus.status = 'finished'
      const { queryByText } = renderComponent()

      expect(queryByText('Join now')).toBeNull()
    })
  })

  const getStepCircle = (text: string, getByText: any) => getByText(text)?.parentElement?.previousElementSibling

  const renderComponent = () => render(<OnBoardingOverlay />)
})
