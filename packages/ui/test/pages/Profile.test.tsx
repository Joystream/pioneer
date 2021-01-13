import React from 'react'
import { render, screen } from '@testing-library/react'
import { Profile } from '../../src/pages/Profile/Profile'

describe('UI: Profile', function () {
  it('Shows balance', function () {
    render(<Profile />)
    screen.getByText(/0 JOY/)
  })
})
