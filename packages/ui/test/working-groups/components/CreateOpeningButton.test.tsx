import { render } from '@testing-library/react'
import React from 'react'

import { CreateOpeningButton } from '@/working-groups/components/CreateOpeningButton'
import { getButton } from '../../_helpers/getButton'

const group = 'storageWorkingGroup'
const newOpeningButtonTitle = 'Add opening'

describe('UI: CreateOpeningButton', () => {
  it.skip('Lead sees CreateOpeningButton', async () => {
    // use lead worker

    renderComponent()

    const button = await getButton(newOpeningButtonTitle)
    expect(button).not.toBeDisabled()
  })

  it.skip('CreateOpening modal', async () => {
    // use lead worker

    renderComponent()

    const button = await getButton(newOpeningButtonTitle)
    expect(button).not.toBeDisabled()
  })

  const renderComponent = () => render(<CreateOpeningButton group={group} />)
})
