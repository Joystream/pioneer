import { Editor } from './types'

type EditorConfig = Record<string, any>

export default class MarkdownEditor {
  static create(sourceElementOrData: HTMLElement | string, config: EditorConfig): Promise<Editor>
}
