export type MemberSize = 's' | 'm' | 'l'

export interface MemberInfoWrapProps {
  isOnDark?: boolean
  showIdOrText?: true | string
  memberSize?: MemberSize
  showGroup?: boolean
  skipModal?: boolean
  onlyTop?: boolean
}
