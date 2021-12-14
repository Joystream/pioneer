import { render, screen } from '@testing-library/react'
import React from 'react'

import { Description } from '@/bounty/components/Descriptions'

describe('Description', () => {
  beforeEach(() => {
    render(<Description title="Description" imageUrl="https://picsum.photos/500/300" description="Some description" />)
  })
  it('It should render the description', () => {
    expect(screen.queryByRole('img')).toBeDefined()
    expect(screen.getByText('Description')).toBeDefined()
    expect(screen.getByText('Some description')).toBeDefined()
  })
})
