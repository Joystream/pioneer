import React from 'react'
import { Link } from 'react-router-dom'

import { useModal } from '@/common/hooks/useModal'

import { AppliedOnOpeningActivity } from '../../types'

interface Props {
  activity: AppliedOnOpeningActivity
}

export const AppliedOnOpeningContent: React.FC<Props> = React.memo(({ activity }: Props) => {
  const { showModal } = useModal()
  const { membership, opening } = activity
  return (
    <>
      <Link to="#" onClick={() => showModal({ modal: 'Member', data: { id: membership.id } })}>
        {membership.handle}
      </Link>{' '}
      has applied on the opening <Link to={`/working-groups/openings/${opening.id}`}>{opening.title}</Link>.
    </>
  )
})
