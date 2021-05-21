import React from 'react'
import { Link } from 'react-router-dom'

import { useModal } from '../../hooks/useModal'
import { Activity } from '../../types'
import { TokenValue } from '../typography'

interface Props {
  activity: Activity
}

export const ActivityContent = React.memo(({ activity }: Props) => {
  const { showModal } = useModal()
  switch (activity.eventType) {
    case 'AppliedOnOpeningEvent':
      return (
        <>
          <Link to="#" onClick={() => showModal({ modal: 'Member', data: { id: activity.membership.id } })}>
            {activity.membership.handle}
          </Link>{' '}
          has applied on the opening{' '}
          <Link to={`/working-groups/openings/${activity.opening.id}`}>{activity.opening.title}</Link>.
        </>
      )
    case 'BudgetSpendingEvent':
      return (
        <>
          {activity.groupName} Lead spent <TokenValue value={activity.amount} /> from the budget.
        </>
      )
    default:
      return <>{activity.eventType}</>
  }
})
