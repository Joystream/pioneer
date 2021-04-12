import React from 'react'

interface IActivity {
  id: string
  time: string
  text: string
}

interface Props {
  activities: IActivity[]
}

const Activity = ({ activity }: { activity: IActivity }) => {
  return (
    <div>
      {activity.time} - {activity.text}
    </div>
  )
}

export const Activities = ({ activities }: Props) => {
  return (
    <div>
      {activities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
