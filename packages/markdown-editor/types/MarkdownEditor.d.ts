import { Editor } from './types'

type EditorConfig = Record<string, any>

export class ClassicEditor {
  static create(sourceElementOrData: HTMLElement | string, config: EditorConfig): Promise<Editor>
}

export class InlineEditor {
  static create(sourceElementOrData: HTMLElement | string, config: EditorConfig): Promise<Editor>
}
