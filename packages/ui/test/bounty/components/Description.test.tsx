import { render, screen } from '@testing-library/react'
import React from 'react'

import { Description } from '@/bounty/components/Descriptions'

describe('Description', () => {
  const title = 'Description Title'
  const imageUrl = 'tst://ima.ge'
  const description = 'Description'
  const props = {
    title,
    imageUrl,
    description,
  }
  beforeEach(() => {
    render(<Description {...props} />)
  })
  it('should render proper image', () => {
    expect(screen.queryByRole('img')).toHaveAttribute('src', imageUrl)
  })
  it('should render proper title', () => {
    expect(screen.queryByText(title)).toBeInTheDocument()
  })
  it('should render proper description', () => {
    expect(screen.queryByText(description)).toBeInTheDocument()
  })
})
