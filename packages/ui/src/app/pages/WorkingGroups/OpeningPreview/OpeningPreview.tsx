import React from 'react'
import { useParams } from 'react-router-dom'

import { AppPage } from '../../../..'
import { PageHeader } from '../../../../common/components/page/PageHeader'
import { PageTitle } from '../../../../common/components/page/PageTitle'
import { PreviousPage } from '../../../../common/components/page/PreviousPage'
import { useOpening } from '../../../../working-groups/hooks/useOpening'

export const OpeningPreview = () => {
  const { id } = useParams<{ id: string }>()
  const { opening } = useOpening(id)

  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Openings' },
    { href: '#', text: opening?.title || 'Opening' },
  ]

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PreviousPage>
          <PageTitle>{opening?.title}</PageTitle>
        </PreviousPage>
      </PageHeader>
    </AppPage>
  )
}
