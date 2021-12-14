import { render, screen } from '@testing-library/react'
import React from 'react'

import { Description } from '@/bounty/components/Descriptions'

describe('Description', () => {
  const title = 'Description Title'
  const imageUrl = 'https://picsum.photos/500/300'
  const description = 'Description'
  const props = {
    title,
    imageUrl,
    description,
  }
  beforeEach(() => {
    render(<Description {...props} />)
  })
  it('should render proper description', () => {
    expect(screen.queryByText(description)).toBeInTheDocument()
  })
})
