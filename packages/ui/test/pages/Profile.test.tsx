import React from 'react'
import { render, screen } from '@testing-library/react'
import { Profile } from '../../src/pages/Profile/Profile'

describe('UI: Profile', () => {
  it('Shows balance', () => {
    render(<Profile />)
    screen.getByText(/0 JOY/)
  })

  it('Shows dashboard', () => {
    render(<Profile />)
    screen.getByText('Dashboard')
  })
})
