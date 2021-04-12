import React from 'react'

interface IActivity {
  id: string
  time: string
  text: string
}

export interface ActivitiesProps {
  activities: IActivity[]
}

const Activity = ({ activity }: { activity: IActivity }) => {
  return (
    <div>
      {activity.time} - {activity.text}
    </div>
  )
}

export const Activities = ({ activities }: ActivitiesProps) => {
  return (
    <div>
      {activities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
