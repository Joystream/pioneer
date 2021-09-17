export type MemberSize = 's' | 'm' | 'l'

export interface MemberInfoWrapProps {
  isOnDark?: boolean
  showId?: boolean
  replaceId?: string
  memberSize?: MemberSize
  showGroup?: boolean
  skipModal?: boolean
  onlyTop?: boolean
}
