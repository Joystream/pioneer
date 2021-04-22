export type ActivityCategory =
  | 'closed'
  | 'hired'
  | 'created'
  | 'increased'
  | 'decreased'
  | 'applied'
  | 'warned'
  | 'joystream'

export type ActivityType = 'error' | 'ok' | 'default'

export interface Activity {
  id: string
  time: string
  text: string
  category: ActivityCategory
  type?: ActivityType
}
