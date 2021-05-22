import React from 'react'
import { Link } from 'react-router-dom'

import { useModal } from '@/common/hooks/useModal'

import { ApplicationWithdrawnActivity } from '../../types'

interface Props {
  activity: ApplicationWithdrawnActivity
}

export const ApplicationWithdrawnContent: React.FC<Props> = React.memo(({ activity }: Props) => {
  const { showModal } = useModal()
  const { membership, opening } = activity
  return (
    <>
      <Link to="#" onClick={() => showModal({ modal: 'Member', data: { id: membership.id } })}>
        {membership.handle}
      </Link>{' '}
      has withdrawn application from "<Link to={`/working-groups/openings/${opening.id}`}>{opening.title}</Link>"
      opening.
    </>
  )
})
