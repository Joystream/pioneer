export type ActivityCategory = 'closed' | 'welcome' | 'trend_upwards' | 'trend_downwards' | 'apply'

export type ActivityType = 'error' | 'ok' | 'default'

export interface Activity {
  id: string
  time: string
  text: string
  category: ActivityCategory
  type?: ActivityType
}
