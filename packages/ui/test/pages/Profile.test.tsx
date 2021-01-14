import React from 'react'
import { render, screen } from '@testing-library/react'
import { Profile } from '../../src/pages/Profile/Profile'

describe('UI: Profile', () => {
  it('Shows loading', () => {
    render(<Profile />)
    screen.getByText('Loading...')
  })
})
