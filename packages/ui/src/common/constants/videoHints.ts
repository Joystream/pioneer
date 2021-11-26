export type VideoHintType = 'workingGroups' | 'proposals' | 'council'

export const videoHints: { [key in VideoHintType]: string } = {
  workingGroups: 'https://play.joystream.org/embedded/video/15',
  proposals: 'https://play.joystream.org/embedded/video/15',
  council: 'https://play.joystream.org/embedded/video/15',
}
