import { Editor } from './types'

type EditorConfig = Record<string, any>

export class MarkdownEditor {
  static create(sourceElementOrData: HTMLElement | string, config: EditorConfig): Promise<Editor>
}

export class InlineMarkdownEditor {
  static create(sourceElementOrData: HTMLElement | string, config: EditorConfig): Promise<Editor>
}
