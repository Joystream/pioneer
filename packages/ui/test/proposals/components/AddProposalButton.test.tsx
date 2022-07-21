import { render } from '@testing-library/react'
import React from 'react'

import { createType } from '@/common/model/createType'
import { ApiContext } from '@/common/providers/api/context'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'

import { getButton } from '../../_helpers/getButton'
import { stubApi, stubConst, stubQuery } from '../../_mocks/transactions'

describe('UI: AddProposalButton', () => {
  const api = stubApi()
  stubConst(api, 'proposalsEngine.maxActiveProposalLimit', createType('u32', 10))

  it('Active proposals under proposal limit', async () => {
    stubQuery(api, 'proposalsEngine.activeProposalCount', createType('u32', 5))
    renderComponent()

    expect(await getButton('Add new proposal')).not.toBeDisabled()
  })

  it('Active proposals limit met', async () => {
    stubQuery(api, 'proposalsEngine.activeProposalCount', createType('u32', 10))
    renderComponent()

    expect(await getButton('Add new proposal')).toBeDisabled()
  })

  const renderComponent = () =>
    render(
      <ApiContext.Provider value={api}>
        <AddProposalButton />
      </ApiContext.Provider>
    )
})
