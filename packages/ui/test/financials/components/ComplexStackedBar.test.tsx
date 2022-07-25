import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ComplexStackedBar, ComplexStackedBarProps } from '@/financials/components/ComplexStackedBar/ComplexStackedBar'

class ResizeObserver {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

describe('UI: ComplexStackedBar', () => {
  window.ResizeObserver = ResizeObserver
  const title = 'Title'
  const details = {
    Dog: {
      Man: 3000,
      Woman: 2000,
    },
    Cat: {
      Man: 1000,
      Woman: 2000,
    },
    Rat: {
      Man: 3000,
      Woman: 3000,
    },
  }

  const data = {
    Dog: 1000,
    Cat: 3000,
    Rat: 4000,
  }

  const props: ComplexStackedBarProps = {
    details,
    title,
    data,
  }

  it('Renders', () => {
    renderComponent()

    expect(screen.queryByText(title)).toBeInTheDocument()
  })

  it('Renders data', () => {
    renderComponent()

    Object.keys(data).forEach((key) => {
      expect(screen.queryByText(key)).toBeInTheDocument()
    })
  })

  it('Renders details', () => {
    renderComponent()

    Object.keys(data).forEach((key) => {
      showDetails(key)

      Object.keys(details[key as keyof typeof details]).forEach((detailKey) => {
        expect(screen.queryByText(detailKey)).toBeInTheDocument()
      })
    })
  })

  const showDetails = (key: string) => {
    const element = screen.getByText(key)

    fireEvent.click(element)
  }

  const renderComponent = () => render(<ComplexStackedBar {...props} />)
})
