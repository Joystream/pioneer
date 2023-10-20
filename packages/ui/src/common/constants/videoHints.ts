export type VideoHintType = 'workingGroups' | 'proposals' | 'council'

export const videoHints: { [key in VideoHintType]: string } = {
  workingGroups: '',
  proposals: '',
  council: '',
}
