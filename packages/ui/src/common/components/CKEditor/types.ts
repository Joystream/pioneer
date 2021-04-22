export declare class Editor {
  getData: () => string
  setData: (data: string) => void
  isReadOnly: boolean
  model: any
  editing: any
  destroy: () => Promise<undefined>

  static create(): Editor
}

export interface EventInfo {
  name: string
  path: any[]
  return: any
  source: any
}
