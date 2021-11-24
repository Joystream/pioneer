export type VideoHintType = 'workingGroups' | 'proposals' | 'council'

export const videoHints: { [key in VideoHintType]: string } = {
  workingGroups: 'https://deploy-preview-1606--atlas-dev.netlify.app/embedded/video/1',
  proposals: 'https://deploy-preview-1606--atlas-dev.netlify.app/embedded/video/1',
  council: 'https://deploy-preview-1606--atlas-dev.netlify.app/embedded/video/1',
}
